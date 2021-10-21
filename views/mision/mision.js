'use strict';

let MisionCtrl = ( scope, link, swal, cApp) => {

    scope.tab = 'tab_1';
    scope.path = cApp().storage;

    scope.nosotros = {};
    
    let getInfoNosotros = async () => {
        let res = await link.get('nosotros/info');
        scope.nosotros = res.data.success ? res.data.json : {};
        scope.$apply();
        
    }

    scope.changeTab = (tab) => scope.tab = tab;

    scope.Init = async () => {
		
		scope.loader = true;

        scope.changeTab('tab_1');

        await getInfoNosotros();

		scope.loader = false;

		scope.$apply();
		
    }

}

MisionCtrl.$inject = ['$scope','link.factory','swal.service','cApp'];

let MisionComponent =  () => {
	return {
        templateUrl: "views/mision/mision.html",
        css:'views/mision/mision.css',
        controller: MisionCtrl
	}
}

angular
	.module('app')
	.component('mision' ,MisionComponent());
