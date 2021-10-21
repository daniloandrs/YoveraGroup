'use strict';

let ContactViewCtrl = ( scope, link, swal, cApp,toast) => {

    scope.path = cApp().storage;

    scope.object = {};
    
    scope.spin =false;

    scope.form;

    let Configuraciones = async () => {
		let res = await link.get('page/configuraciones');
		scope.configuraciones = res.data.success ? res.data.json : [];
	};

	scope.Init = async () => {
        scope.loader =true;
        await Configuraciones();
        scope.loader = false;
        scope.$apply();
    };
    
    scope.send = async () => {

        scope.spin = true;

        let res = await link.post('page/send_contact',scope.object);
  
        if(res.data.success) {

            scope.spin = false;

            toast.push({ title: 'Éxito', body : res.data.message , type: 'success' });
            scope.object = {
                nombre : '',
                email : '',
                telefono : '',
                asunto : '',
                mensaje : ''
            };
        }

        scope.$apply();
        
        (scope.form) ? scope.form.$setPristine() : {};

    }
}

ContactViewCtrl.$inject = ['$scope','link.factory','swal.service','cApp','toast.service'];

let ContactViewComponent =  () => {
	return {
        templateUrl: "views/contact/contact.html",
        css:'views/contact/contact.css',
        controller: ContactViewCtrl
	}
}

angular
	.module('app')
	.component('contactView' ,ContactViewComponent());
