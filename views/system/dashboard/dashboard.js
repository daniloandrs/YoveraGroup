'use strict';

const DashboardCtrl = (scope,link,swal,memory,storage) => {

	scope.loader = false;
	scope.forms = {};
	scope.object = {};
	scope.menu_deleted = {};

	var model_menu = '\\App\\AuthModel\\Menu';
	var model_rol  = '\\App\\AuthModel\\Rol';
	
	let roles = () => {
		scope.loader = true;
		link.get_crud(model_rol).then( res => {
			scope.roles = res.data.success ? res.data.json : [];
			scope.loader = false;
		});
	};

	let menus = () => {
		scope.loader = true;
		link.get_crud(model_menu).then( res => { 
			scope.menus = res.data.success ? res.data.json : [];
			scope.loader = false;
		});
	};
	
	scope.createModal = () => {
		scope.create_opcion = true;
		scope.titleModal = 'Crear Menú';
		scope.title_button = 'Crear';
		scope.clear();
		swal.openModal('modal-menu');
	};

	scope.clear = () => {
		scope.object = {};
		(scope.forms.menu) ? scope.forms.menu.$setPristine() : {};
	};

	scope.postSend = (message) => {
		menus();
		swal.closeModal('modal-menu');
		swal.success(message);
		scope.clear();
		scope.spin = false;
	};

	scope.errorSend = (message) => {
		swal.error(message);
		scope.spin = false;
	};

	scope.deleteTransaction = () => {
		link.delete_crud(model_menu,scope.menu_deleted).then( res => 
			res.data.success ? scope.postSend(res.data.message) : scope.errorSend(res.data.message) );
	};

	scope.deleteModal = menu => {
		scope.menu_deleted = menu;
		swal.confirm('¿ Seguro que desea eliminar este menú ?',scope.deleteTransaction);
	};

	scope.editModal = menu => {
		scope.object = angular.copy(menu);
		scope.titleModal = 'Actualizar Menú';
		scope.title_button = 'Actualizar';
		scope.create_opcion = false;
		swal.openModal('modal-menu');
	};

	scope.send = (object) => {
		scope.spin = true;
		if (object.id == null)
			link.create_crud(model_menu,object).then( res => 
				res.data.success ? scope.postSend(res.data.message) : scope.errorSend(res.data.message) );
		else
			link.update_crud(model_menu,object).then( res => 
				res.data.success ? scope.postSend(res.data.message) : scope.errorSend(res.data.message) );
	};


	scope.administrar = (menu) => {
		menu.spin_administrar = true;
		memory.store('menu',menu);
		storage.redirect('#/menu/administrar');
		menu.spin_administrar = false;
	};

	scope.preload = () => scope.init();

	//init 
	scope.init = () => {
		menus();
		roles();
	};

	scope.init();

}

DashboardCtrl.$inject = ['$scope','link.factory','swal.service','memory.service','storage.service'];

const DashboardComponent =  () => {
	return {
		templateUrl:'views/system/dashboard/dashboard.html',
		css:'views/system/dashboard/dashboard.css',
		controller: DashboardCtrl
	}
}

angular
	.module('app')
	.component('dashboard',DashboardComponent());