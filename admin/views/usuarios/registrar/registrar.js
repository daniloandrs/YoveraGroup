
'use strict';

let UserRegisterCtrl = ( scope, link,swal,WizardHandler) => {

    scope.formUsuario = null;

    scope.main_obj = {};
    scope.bandera = false;
    
    scope.spin = false;

    let ListEvent__roles = async () => {
        scope.list_roles = [];
        let res = await link.get_crud('\\App\\AuthModel\\Rol');
        scope.list_roles = res.data.success ? res.data.json : [];
    };   

    scope.register = async () => {
        scope.spin = true;
        let res = await link.post(`system/user_register`, scope.main_obj);
        if(res.data.success){
            scope.clear();
            swal.success(res.data.message);
        } else {
            scope.spin = false;
            swal.error(res.data.message);
        }
    };


    scope.clear = () => {
        scope.spin = false;
        scope.main_obj = {};
        scope.formUsuario?.$setPristine()
        WizardHandler.wizard().reset();
    };

    scope.onInit = async () => {
        await ListEvent__roles();
        scope.$apply();
    };

}

UserRegisterCtrl.$inject = ['$scope','link.factory','swal.service','WizardHandler'];

let UserRegisterComponent =  () => {
	return {
		templateUrl: "views/usuarios/registrar/registrar.html",
		css: 'views/usuarios/registrar/registrar.css',
        controller: UserRegisterCtrl
	}
}

angular
	.module('app')
    .component('userRegister',UserRegisterComponent()) ;
    