'use strict';

const CursosClientesCtrl = (scope, link, swal, utils, cApp) => {

	scope.loader = false;

	scope.forms = {};

	scope.object = {};
	scope.cursoObject = {};

	scope.crud_deleted = {};

	let model = '\\App\\ClienteCurso';

	let modelCurso = '\\App\\Course';

	scope.path = cApp().storage;

    scope.modelTitle = 'Cliente';

	let getData = async () => {
		let res = await link.get_crud(model);
		scope.listData = res.data.success ? res.data.json : [];
	};
	
	let getCursos = async () => {
		let res = await link.get_crud(modelCurso);
		scope.cursosList = res.data.success ? res.data.json : [];
	};
	
	scope.createModal = () => {
		scope.create_opcion = true;
		scope.titleModal = `Nuevo ${scope.modelTitle}`;
		scope.title_button = 'Registrar cliente';
		scope.clear();
		swal.openModal('modal-crud');
	};

	scope.editModal = (course) => {
		scope.object = angular.copy(course);
		scope.create_opcion = false;
		scope.titleModal = `Editar ${scope.modelTitle}`;
		scope.title_button = 'Editar Curso';
		swal.openModal('modal-crud');
	}

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
		let res = await link.deletes('course/'+ scope.crud_deleted.id);
		res.data.success ? await scope.postSend(res.data.message) : scope.errorSend(res.data.message);
		scope.loader = false;
		scope.$apply();
	};
 
	scope.deleteModal = (menu) => {
		scope.crud_deleted = menu;
		swal.confirm(`¿ Seguro que desea eliminar este ${scope.modelTitle} ?`,  deleteTransaction);
	};

	scope.addCurso = async () => {
		scope.spinAdd  = true;
		let data = {
			cliente_id : scope.clienteSeleccionado.id,
			curso_id	: scope.cursoObject.id
		};	
		let res = await link.post(`cliente_curso/add_mis_cursos`,data);
		if(res.data.success) {
			let cliente = scope.clienteSeleccionado;
			await scope.getMisCursos(cliente);
			swal.success(res.data.message);
			scope.spinAdd = false;
			scope.cursoObject = {
				id : null
			}
			scope.$apply();
		}
		
	};

	scope.quitarCurso = () => {

	};
   
	scope.createCliente = async () => { 
		scope.spin = true;
		let res = scope.create_opcion ? await link.post('cliente_curso/create',scope.object) : await link.post('cliente_curso/update',scope.object);
		res.data.success ? await scope.postSend(res.data.message) : scope.errorSend(res.data.message);
		scope.$apply();
	};

	scope.getMisCursos = async(row) => {
		row.spinner  = true;
		scope.cursosSinAsignar = [];
		scope.misCursos = [];
		scope.clienteSeleccionado = angular.copy(row);
		let res = await link.get(`cliente_curso/get_mis_cursos/${row.id}`);
		if(res.data.success){
			scope.cursosSinAsignar = res.data.json.cursosSinAsignar;
			scope.misCursos = res.data.json.misCursos;
		}
		row.spinner = false;
		scope.$apply();
		swal.openModal('modal-asignacion-cursos');

	}

	scope.verCredenciales = (row) => {
		scope.credenciales = angular.copy(row);
		swal.openModal('modal-credenciales');
	}

	scope.$watch('object.name',value => {
		if(value){
			scope.object.url = utils.createUrl(value);
		}
	});

	scope.preload = async () => await scope.Init();


	scope.Init = async () => {
		scope.loader = true;
		await getData();
		await getCursos();
		scope.loader = false;
		scope.$apply();
	};

}

CursosClientesCtrl.$inject = 
[
	'$scope',
	'link.factory',
	'swal.service',
	'utils.service',
	'cApp'
];

const CursosClientesComponent =  () => {
	return {
		templateUrl:'views/cursos-clientes/cursos-clientes.html',
		css:'views/cursos-clientes/cursos-clientes.css',
		controller: CursosClientesCtrl
	}
}

angular
	.module('app')
	.component('cursosClientes',CursosClientesComponent());