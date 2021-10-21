
'use strict';

let UserAdministrarCtrl = ( scope, link,swal) => {

    scope.main_obj = {};
    scope.object = {};
    scope.modal = {};
    scope.formUsuario = {};

    scope.typePassword = 'password';
    scope.iconEye = 'fa fa-eye';

    let ListEvent = () => {
        scope.list_data = [];
        link.get_crud('\\App\\User','roles')
            .then(res => scope.list_data = res.data.success ? res.data.json : []);
    };       

    let ListEvent__roles = async () => {
        scope.list_roles = [];
        let res = await link.get_crud('\\App\\AuthModel\\Rol');
        scope.list_roles = res.data.success ? res.data.json : [];
    };   

    scope.showPassword = () => {
        if(scope.typePassword == 'password') {
            scope.typePassword = 'text';
            scope.iconEye = 'fas fa-eye-slash';
            return;
        } else  {
            scope.typePassword = 'password';
            scope.iconEye = 'fa fa-eye';
            return;
        }

    };

    scope.saveUser = async () => {
        scope.spin = true;
        let res = await link.post('system/user_update',scope.main_obj);  
        if(res.data.success) {
            ListEvent();
            scope.spin = false;
            swal.closeModal('modal-edit-user');
            swal.success(res.data.message);
        } else {
            scope.spin = false;
            swal.error(res.data.error);
        }
    };

    scope.updatePassword = async () => {
        scope.spin = true;
        let res = await link.post('system/password_update',scope.object);  
        if(res.data.success) {
            ListEvent();
            scope.spin = false;
            swal.closeModal('modal-edit-password');
            swal.success(res.data.message);
        } else {
            scope.spin = false;
            swal.error(res.data.error);
        }
    };

    scope.changePassword = (row) => {
        scope.object.id = row.id;
        scope.object.password = null;
        swal.openModal('modal-edit-password');
    };

    scope.EditUser = row => {  
        scope.main_obj = angular.copy(row);
        scope.main_obj.rol_id = row.roles.find(i=> true).id;
        swal.openModal('modal-edit-user');
        
    };

    scope.onInit = () => {
        ListEvent(); 
        ListEvent__roles();
    };

};    

UserAdministrarCtrl.$inject = ['$scope','link.factory','swal.service'];

let UserAdministrarComponent =  () => {
	return {
		templateUrl: "views/usuarios/administrar/administrar.html",
		css: 'views/usuarios/administrar/administrar.css',
        controller: UserAdministrarCtrl
	}
}

angular
	.module('app')
    .component('userManage',UserAdministrarComponent());
