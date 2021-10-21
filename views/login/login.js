'use strict';

let LoginComponentCtrl = ( scope, link, swal, cApp,toast,storage,http) => {

    scope.path = cApp().storage;

    scope.object = {};
    
    scope.form;

	scope.Init = () => {
        if(storage.get('user') != null) {
            storage.redirect('#/');
        }
    }

    scope.login = async () => {

        scope.spinner = true;

        let res = await link.post('page/login',scope.object);
        
        if(res.data.success) {
            scope.spinner = false;
            storage.set('user',res.data.json);
            storage.set('token',res.data.json.app_token);
            let token = storage.get('token');
            if (token)
                http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            window.location.reload();
        } else {
            scope.spinner = false;
            swal.error(res.data.message);
        }

        (scope.form) ? scope.form.$setPristine() : {};

    }
}

LoginComponentCtrl.$inject = [
    '$scope',
    'link.factory',
    'swal.service',
    'cApp',
    'toast.service',
    'storage.service',
    '$http'
];

let LoginComponent =  () => {
	return {
        templateUrl: "views/login/login.html",
        css:'views/login/login.css',
        controller: LoginComponentCtrl
	}
}

angular
	.module('app')
	.component('login' ,LoginComponent());
