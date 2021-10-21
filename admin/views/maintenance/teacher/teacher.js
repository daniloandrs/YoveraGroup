'use strict';

const TeacherCtrl = (scope,link,swal) => {

	scope.loader = false;
	scope.forms = {};
	scope.object = {};
	scope.crud_deleted = {};

	let model = '\\App\\Teacher';

    scope.modelTitle = 'Instructor';

	let getData = async () => {

		let res = await link.get_crud(model);
		
		scope.listData = res.data.success ? res.data.json : [];
		
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

		scope.loader = false;
		
		scope.$apply();
	};

}

TeacherCtrl.$inject = ['$scope','link.factory','swal.service'];

const TeacherComponent =  () => {
	return {
		templateUrl:'views/maintenance/teacher/teacher.html',
		css:'views/maintenance/teacher/teacher.css',
		controller: TeacherCtrl
	}
}

angular
	.module('app')
	.component('teacher',TeacherComponent());