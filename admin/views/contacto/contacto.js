'use strict';

const ContactoCtrl = (scope,link,swal) => {

	scope.loader = false;
	scope.forms = {};
	scope.object = {};
	scope.crud_deleted = {};

	let model = '\\App\\Contacto';

    scope.modelTitle = 'Formulario de Contacto';

	let getData = async () => {
		let res = await link.get_crud(model);
		scope.listData = res.data.success ? res.data.json : [];
	};
	
	let getDataConfiguraciones = async () => {
		let res = await link.get('contacto/get_configuraciones');
		scope.configuraciones = res.data.success ? res.data.json : {};
	};

	scope.createModal = () => {
		scope.create_opcion = true;
		scope.titleModal = `Crear ${scope.modelTitle}`;
		scope.title_button = 'Crear';
		scope.clear();
		swal.openModal('modal-crud');
	};

	scope.clear = () => {

		scope.object = {};
		
		(scope.forms.menu) ? scope.forms.menu.$setPristine() : {};

	};

	scope.sendData = async (data) => {
		let res = await link.post('contacto/set_configuraciones',data);
		if(res.data.success){
			swal.success(res.data.message);
			swal.closeModal('modal-configuraciones');
			
			await getDataConfiguraciones();
			scope.$apply();
		} else {
			swal.error(res.data.message);
		}
	}

	scope.postSend = async (message) => {
		
		await getData();
		swal.closeModal('modal-crud');
		swal.success(message);
		scope.clear();
		scope.spin = false;

	};

	scope.errorSend = (message) => {

		swal.error(message);
		
		scope.spin = false;
	
	};

	let deleteTransaction = async () => {
		
		scope.loader = true;

		let res = await link.delete_crud(model,scope.crud_deleted);

		res.data.success ? await scope.postSend(res.data.message) : scope.errorSend(res.data.message);
		
		scope.loader = false;
  
		scope.$apply();

	};

	scope.addLeido = async (row) => {
		row.isLeido = true;
		let res = await link.update_crud(model,row);
		if(res.data.success){
			await getData();
			swal.success(res.data.message);
			scope.$apply();
		}
	}

	scope.openModalConfiguraciones = () => {
		swal.openModal('modal-configuraciones');
	};

	scope.deleteModal = (menu) => {

		scope.crud_deleted = menu;
		
		swal.confirm(`¿ Seguro que desea eliminar este ${scope.modelTitle} ?`,  deleteTransaction);
	
	};

	scope.editModal = data => {

		scope.object = angular.copy(data);
		
		scope.titleModal = `Actualizar ${scope.modelTitle}`;
		
		scope.title_button = 'Actualizar';
		
		scope.create_opcion = false;
		
		swal.openModal('modal-crud');
	};
   
	scope.send = async (object) => {

		scope.spin = true;
		
		let res = (object.id == null) ? await link.create_crud(model,object) : await link.update_crud(model,object);

		res.data.success ? await scope.postSend(res.data.message) : scope.errorSend(res.data.message);

		scope.$apply();

	};

	scope.preload = async () =>  { 
	
		await scope.Init();
	}

	scope.Init = async () => {
		scope.loader = true;
		await getData();
		await getDataConfiguraciones();
		scope.loader = false;
		scope.$apply();
	};

}

ContactoCtrl.$inject = ['$scope','link.factory','swal.service'];

const ContactoComponent =  () => {
	return {
		templateUrl:'views/contacto/contacto.html',
		css:'views/contacto/contacto.css',
		controller: ContactoCtrl
	}
}

angular
	.module('app')
	.component('contacto',ContactoComponent());