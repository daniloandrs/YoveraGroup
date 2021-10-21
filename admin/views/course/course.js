'use strict';

const CourseCtrl = (scope, link, swal, WizardHandler, utils, cApp, storage, location) => {

	scope.loader = false;

	scope.forms = {};

	scope.object = {};

	scope.crud_deleted = {};

	let model = '\\App\\Course';

	scope.path = cApp().storage;

	const othersModel = {
		levelModel 		: '\\App\\Level',
		CategoryModel 	: '\\App\\Category',
		TypeCourseModel : '\\App\\TypeCourse',
		TeacherModel	: '\\App\\Teacher'
	};

    scope.modelTitle = 'Curso';

	scope.cancelEvent = () => {
		scope.clear();
		WizardHandler.wizard().reset();
	};

	scope.optionsImage =  {  
		multiple : false,
		type : 'image',
		dimentions : {
			size : 1000000,
			height : 1000000,
			width : 10000000
		}
	}

	scope.optionsVideo =  {  
		multiple : false,
		type : 'video/mp4',
		dimentions : {
			size : 10000000
		}
	}

	/**text editor */
	var quill;
	var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{'header': 1}, { 'header': 2}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{ 'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{ 'direction': 'rtl'}],
        [{ 'size': ['small', false, 'large', 'huge'] }], 
        [{
            'header': [1, 2, 3, 4, 5, 6, false]
        }],
        ['link', 'image', 'video', 'formula'],
        [{
            'color': []
        }, {
            'background': []
        }],
        [{
            'font': []
        }],
        [{ 'align': 'left'}, { 'align': 'center'}, {'align': 'right'}],
        ['clean']
    ];

	let getData = async () => {
		let res = await link.get_crud(model);
		scope.listData = res.data.success ? res.data.json : [];
	};
	
	let getLevel = async () => {
		let res = await link.get_crud(othersModel.levelModel);
		scope.listLevel = res.data.success ? res.data.json : [];
	};
	
	let getCategory = async () => {
		let res = await link.get_crud(othersModel.CategoryModel);
		scope.listCategory = res.data.success ? res.data.json : [];
	};

	let getTypeCourse = async () => {
		let res = await link.get_crud(othersModel.TypeCourseModel);
		scope.listTypeCourse = res.data.success ? res.data.json : [];
	};

	let getTeacher = async () => {
		let res = await link.get_crud(othersModel.TeacherModel);
		scope.listTeacher = res.data.success ? res.data.json : [];
	};

	scope.createModal = () => {
		scope.create_opcion = true;
		scope.titleModal = `Nuevo ${scope.modelTitle}`;
		scope.title_button = 'Crear Curso';
		scope.clear();
		WizardHandler.wizard().reset();
		swal.openModal('modal-crud');
	};

	scope.editModal = (course) => {
		scope.object = angular.copy(course);
		scope.object.default_background_image = scope.path + course.background_image;
		scope.object.default_presentation_video = scope.path + course.presentation_video;
		scope.create_opcion = false;
		scope.titleModal = `Editar ${scope.modelTitle}`;
		scope.title_button = 'Editar Curso';
		WizardHandler.wizard().reset();
		swal.openModal('modal-crud');
	}

	scope.clear = () => {
		scope.object = {};
		(scope.forms.menu) ? scope.forms.menu.$setPristine() : {};
	};

	scope.addContenido = (curso) => {
		scope.cursoEditor 	 = angular.copy(curso);
		quill.root.innerHTML = curso.about;
		swal.openModal('modal-editor');
	};

	scope.saveContenido = async () => {
		scope.spinForm = true;
		let data = {
			id : scope.cursoEditor.id,
			about : quill.root.innerHTML
		}
		let res = await link.post('course/create_contenido',data);
        if (res.data.success) {
            await getData();
			scope.spinForm = false;
			scope.$apply(); 
            swal.closeModal('modal-editor');
		}
	};

	scope.seeTemary = (row) => {
		let course = {
			id : row.id,
			name : row.name
		}

		storage.set('course_selected',course);
		location.path('cursos/temario')
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
		let res = await link.deletes('course/'+ scope.crud_deleted.id);
		res.data.success ? await scope.postSend(res.data.message) : scope.errorSend(res.data.message);
		scope.loader = false;
		scope.$apply();
	};

	scope.deleteModal = (menu) => {
		scope.crud_deleted = menu;
		swal.confirm(`¿ Seguro que desea eliminar este ${scope.modelTitle} ?`,  deleteTransaction);
	};

   
	scope.createCourse = async () => { 
		scope.spin = true;
		scope.object.url_course = utils.createUrl(scope.object.name);
		let res = scope.create_opcion ? await link.formData('course/create',scope.object) : await link.formData('course/update',scope.object);
		res.data.success ? await scope.postSend(res.data.message) : scope.errorSend(res.data.message);
		scope.$apply();
	};

	scope.$watch('object.name',value => {
		if(value){
			scope.object.url = utils.createUrl(value);
		}
	});

	scope.preload = async () => await scope.Init();


	scope.Init = async () => {
		scope.loader = true;
		await getData();
		await getLevel();
		await getCategory();
		await getTypeCourse();
		await getTeacher();
		scope.loader = false;
		setTimeout(() => {  
            quill = new Quill('#editor', {
                theme: 'snow',
                modules: {  
                    toolbar: toolbarOptions
                },
            });
		},100);
		scope.$apply();
	};

}

CourseCtrl.$inject = 
[
	'$scope',
	'link.factory',
	'swal.service',
	'WizardHandler',
	'utils.service',
	'cApp',
	'storage.service',
	'$location'
];

const CourseComponent =  () => {
	return {
		templateUrl:'views/course/course.html',
		css:'views/course/course.css',
		controller: CourseCtrl
	}
}

angular
	.module('app')
	.component('course',CourseComponent());