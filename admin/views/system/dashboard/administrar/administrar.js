'use strict';

const DashboardAdministrarCtrl = (scope,link,swal,memory,storage) => {

	var model_option = '\\App\\AuthModel\\Opcion';
	var model_item 	 = '\\App\\AuthModel\\Item';

	scope.loader = false;

	scope.forms = {
		menu : null,
		item : null
	};

	scope.objectOption = {};
	scope.objectItem   = {};
	scope.menu;
	
	scope.spin;
	
	let exist = () => {

		if (memory.get('menu') != undefined) {
			
			scope.menu_selected = memory.get('menu');
			
			opcion();

		} else { 

			return storage.redirect('#/menu');
		}
	}

    
	let opcion = () => {
		
		scope.loader = true;
		
		link.post('system/menu_selected',{menu_id:scope.menu_selected.id}).then( res => { 
			scope.menu = res.data.success ? res.data.json : [];
			scope.loader = false;
		});
	};  
	
	scope.openModalCreateOption = () => {
		scope.create_opcion = true;
		scope.titleModal = 'Crear Opción';
		scope.title_button = 'Crear';
		scope.clear();
		scope.objectOption.menu_id = scope.menu_selected.id;
		swal.openModal('modal-opcion');
	};

	scope.clear = () => {
		scope.objectOption = {};
		(scope.forms.menu) ? scope.forms.menu.$setPristine() : {};
	};

	scope.clearItem = () => {
		scope.objectItem = {};
		(scope.forms.item) ? scope.forms.item.$setPristine() : {};
	};

	scope.postSend = message => {
		opcion();
		swal.closeModal('modal-opcion');
		swal.closeModal('modal-item');
		swal.success(message);
		scope.clear();
		scope.spin = false;
	};

	scope.errorSend = message => {
		swal.error(message);
		scope.spin = false;
	};

	scope.deleteOptionTransaction = () => {
		link.delete_crud(model_option,scope.option_deleted).then( res => 
			res.data.success ? scope.postSend(res.data.message) : scope.errorSend(res.data.message) );
	};

	scope.openModalDeleteOption = option => {
		scope.option_deleted = option;
		swal.confirm('¿ Seguro que desea eliminar esta opción ?',scope.deleteOptionTransaction);
	};

	scope.openModalEditOption = option => {
		scope.objectOption = angular.copy(option);
		scope.titleModal = 'Editar Opción';
		scope.title_button = 'Actualizar';
		scope.create_opcion = false;
		scope.spin = false;
		swal.openModal('modal-opcion');
	};

	scope.sendCreateOrUpdateOption = object => {
		scope.spin = true;
		if (object.id == null)
			link.create_crud(model_option,object).then( res => 
				res.data.success ? scope.postSend(res.data.message) : scope.errorSend(res.data.message) 
			);
		else
			link.update_crud(model_option,object).then( res => 
				res.data.success ? scope.postSend(res.data.message) : scope.errorSend(res.data.message) 
			);
	};

	scope.sendCreateOrUpdateItem = (objectItem) => {

		scope.spin = true;

		if (objectItem.id == null)
			link.create_crud(model_item,objectItem).then( res => 
				res.data.success ? scope.postSend(res.data.message) : scope.errorSend(res.data.message) 
			);
		else
			link.update_crud(model_item,objectItem).then( res => 
				res.data.success ? scope.postSend(res.data.message) : scope.errorSend(res.data.message) 
			);
	}


	scope.administrar = menu => {
		menu.spin_administrar = true;
		memory.store(menu);
		storage.redirect('#/dashboard/administrar');
		menu.spin_administrar = false;
	};

	scope.giveItem = async (item) => {
		item.spin = true;
		let data = {
			menu_id : scope.menu_selected.id,
			item_id : item.id,
			add 	: !item.isSelected
		};
		let response = await link.post('system/give_item',data);
		response.data.success ? scope.postSend(response.data.message) : scope.errorSend(response.data.message);
		scope.$apply();
	}
  
	scope.modalItem = (option) => {
		scope.create_item = true;
		scope.titleModalItem = 'Crear Sub Opción';
		scope.title_button_item = 'Crear';
		scope.clearItem();
		scope.objectItem = {
			opcion_id : option.id
		};
		swal.openModal('modal-item');
	}

	scope.modalUpdateSubOption = (item) => {
		console.log(item);
		scope.clearItem();
		scope.create_item = false;
		scope.titleModalItem = 'Editar Sub Opción';
		scope.title_button_item = 'editar';
		scope.objectItem = angular.copy(item);
		/*
		scope.objectItem = {
			opcion_id : option.id
		};
		*/
		swal.openModal('modal-item');
	};


	scope.preload = () => scope.init();
	scope.init = () => {
		exist();
	};
	
}

DashboardAdministrarCtrl.$inject = ['$scope','link.factory','swal.service','memory.service','storage.service'];

const DashboardAdministrarComponent = () => {
	return {
		templateUrl: "views/system/dashboard/administrar/administrar.html",
		css: 'views/system/dashboard/administrar/administrar.css',
		controller: DashboardAdministrarCtrl
	}
}

angular
	.module('app')
	.component('dashboardAdministrar',DashboardAdministrarComponent());
