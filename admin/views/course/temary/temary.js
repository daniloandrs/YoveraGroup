'use strict';

const TemaryCtrl = (scope, link, swal, cApp, storage, location, WizardHandler, sce,helperDropzone) => {

	scope.loader = false;

	scope.forms = {
		
		module : null, 

		temary_class : null
		
	};

	scope.objectModule = {};

	scope.objectClass  = {};

	scope.modelDelete = {};

	scope.course = {};

	scope.path = cApp().storage;

	scope.optionsVideo =  {  
		multiple : false,
		type : 'video/mp4',
		dimentions : {
			size : 1000000000
		}
	}

    scope.modelTitle = 'Temario';
 
	let token = storage.get('user').token;
	
	/**create dropzone adjuntos */

	scope.routeDropzone_adjuntos = link.routeDropzone(`temary_class/send_adjuntos`);

    let createDropzoneAdjuntos = () => {
        if (document.getElementById('adjuntos-upload')) {
            scope.dropzoneAdjuntos = helperDropzone.configDropzone(
				'adjuntos-upload', 
				scope.routeDropzone_adjuntos,
				'adjuntos',
				token,
				"application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation",
				true
			);
        }    
    } 

	/**create dropzone video */
	scope.routeDropzone = link.routeDropzone(`temary/send_with_dropzone`);

    let createDropzone = () => {
        if (document.getElementById('video-upload')) {
            scope.dropzone = helperDropzone.configDropzone(
				'video-upload',
				scope.routeDropzone,
				'video',
				token,
				".mp4,.mkv,.avi",
				false
			);
        }    
    } 

	scope.clearImages = function () {
		scope.dropzone.removeAllFiles();   
		scope.imagesDeletes = [];
	}
	
  
	scope.addDocumentos = (temary_class) => {
		console.log(temary_class);
		scope.spin_adjuntos = false;
		scope.filesAdjuntos = [];
		scope.claseSelected = angular.copy(temary_class);
		swal.openModal('modal-documentos');
	};


	/**dropzone adjuntos */

	scope.sendAdjuntos = async () => {

		if(scope.dropzoneAdjuntos.getQueuedFiles().length > 0) {
            scope.spin_adjuntos = true;
            scope.dropzoneAdjuntos.processQueue();
        } else {
           return swal.error('Debe subir al menos un archivo.');
        }

	}

	scope.assignIcon = (tipo_archivo) => {
		
		let icon = "fa-5x fas fa-file";
		let icon_file;

		switch (tipo_archivo) {
			case 'docx':
					icon_file = `${icon}-word color-word`;
				break;
			case 'pdf':
				icon_file = `${icon}-pdf color-pdf`;
				break;
				
			case 'xlsx':
			case 'xls':
				icon_file = `${icon}-excel color-excel`;
				break;

			case 'pptx':
			case 'ppt' : 
				icon_file = `${icon}-powerpoint color-ppt `;
				break;
			default :
				icon_file = `${icon}-alt color-file`;
		}
		return icon_file;
	}	


	scope.deleteAdjunto = (file) => {
		swal.confirm('¿Seguro que desea eliminar este archivo?',async () => {
            file.spin = true;
            let res = await link.deletes('temary_class/delete_adjunto/' + file.id);
            if(res.data.success) {
                swal.success(res.data.message);
				await Temary(scope.course.id);
				let item = scope.temaryList.find(i => i.id == scope.claseSelected.temary_id);
				let adjuntos = item.temary_courses.find(i => i.id == scope.claseSelected.id);
				scope.claseSelected = angular.copy(adjuntos);
                scope.$apply();
            }
        });
	};

	scope.loadDropzoneAdjuntos = () => {
		scope.dropzoneAdjuntos.removeAllFiles();
        scope.dropzoneAdjuntos.on('sendingmultiple',function(file, response,formData){
            formData.append('temary_class_id',scope.claseSelected.id);
        });

        scope.dropzoneAdjuntos.on('addedfile',function(file){
			scope.filesAdjuntos = file;
            scope.$apply();
        });

        scope.dropzoneAdjuntos.on("processing", function() {
            this.options.url = scope.routeDropzone_adjuntos;
        });   

        scope.dropzoneAdjuntos.on('successmultiple',async function(file,response){
            if(response.success) {            
                await Temary(scope.course.id);
                scope.clearImages();
				let item = scope.temaryList.find(i => i.id == scope.claseSelected.temary_id);
				let adjuntos = item.temary_courses.find(i => i.id == scope.claseSelected.id);
                scope.claseSelected = angular.copy(adjuntos);
                scope.flagImages = false;
				scope.spin_adjuntos = false;
				scope.dropzoneAdjuntos.removeAllFiles();
                swal.success(response.message);
                scope.$apply();
            }  else {
                swal.error('Algo ha salido mal :c .');
                scope.spin_adjuntos = false;
            }
        });
        
        scope.dropzoneAdjuntos.on("dictCancelUpload", function(file) {
            scope.loadDeleteImage(file.name);
        });

        scope.dropzoneAdjuntos.on("maxfilesexceeded", function(file) {
            this.removeFile(file); 
        });
        
        scope.loadDeleteImage = function(name){
            angular.forEach(scope.images,function(value){
                if(value.src == name)
                    scope.imagesDeletes.push(value.id);
            });
        };

	}
	

	/**end dropzone */

	scope.loadDropzone = () => {
        scope.clearImages();
        scope.dropzone.on('sending',function(file, response,formData){
			formData.append('temary_id',scope.objectClass.temary_id);
			formData.append('id',scope.objectClass.id);
			formData.append('title',scope.objectClass.title);	
			formData.append('description',scope.objectClass.description);
        });

        scope.dropzone.on('addedfile',function(file) {
			scope.files = file;
			scope.$apply();
        });

        scope.dropzone.on("processing", function(file,operation) {
			if (scope.create_opcion_class) {
				this.options.url = "./api_rest/public/api/temary_class/create"
			}  else {
				this.options.url = "./api_rest/public/api/temary_class/update"
			}
        });

        scope.dropzone.on('success',async function(file,response){
			if(response.success) {            
				await Temary(scope.course.id);
				swal.success(response.message);
				swal.closeModal('modal-class');
				scope.spin_class = false;
				scope.$apply();
            }  else {
                swal.error('Algo ha salido mal :c .');
                scope.spin_class = false;
            }
        });
   
        scope.dropzone.on("dictCancelUpload", function(file) {
            scope.loadDeleteImage(file.name);
        });

        scope.dropzone.on("maxfilesexceeded", function(file) {
            this.removeFile(file); 
        });
        
        scope.loadDeleteImage = function(name){
            angular.forEach(scope.images,function(value){
                if(value.src == name)
                    scope.imagesDeletes.push(value.id);
            });
        };

	}
	
	/**end dropzone */

	let Temary = async (course_id) => {
		let res = await link.get(`temary/${course_id}`);
		scope.temaryList = res.data.success ? res.data.json : [];
	}  

	let getTemary = async () => {
		scope.course = storage.get('course_selected');
		if (scope.course == undefined)
			return location.path('cursos');
		if (scope.course)
			storage.delete('course_selected');
		await Temary(scope.course.id);

	}
	
	scope.addTemary = () => {
		scope.title_button_module = 'Nuevo Módulo';
		scope.create_opcion_module = true;
		scope.clear();
		swal.openModal('modal-temary');
	}

	scope.editTemary = (temary) => {
		scope.objectModule =angular.copy(temary);
		scope.title_button_module = 'Editar Módulo';
		scope.create_opcion_module = false;
		swal.openModal('modal-temary');
	}

	scope.createModule = async () => {
		scope.spin_module = true;
		scope.objectModule.course_id = scope.course.id;
		let res = scope.create_opcion_module ? await link.post('temary/create',scope.objectModule) : await link.post('temary/update',scope.objectModule);
		if(res.data.success) {			
			await Temary(scope.course.id);
			swal.success(res.data.message);
			swal.closeModal('modal-temary');
		} else {
			swal.error(res.data.message);
		}
		scope.spin_module = false;
		scope.$apply();
	}


	scope.addClass = (temary) => {
		WizardHandler.wizard().reset();
		scope.title_button_class = 'Nueva Clase';
		scope.create_opcion_class = true;
		scope.clearImages();
		scope.objectClass.temary_id = temary.id;
		swal.openModal('modal-class');
	}

	scope.editClass = (temary_class) => {
		WizardHandler.wizard().reset();
		scope.clearImages();
		scope.objectClass = angular.copy(temary_class);
		scope.title_button_class = 'Editar Clase';
		scope.create_opcion_class = false;
		swal.openModal('modal-class');
	}

	scope.createClass = async () => {

		if(scope.dropzone.getQueuedFiles().length > 0) {
            scope.spin_class = true;
            scope.dropzone.processQueue();
        } else {
           return swal.error('Debe subir un video.');
        }

	}

	let deleteClassApi = async () => {

		let res = await link.deletes(`temary_class/delete/${scope.modelDelete.id}`);
		
		if (res.data.success)
			swal.success(res.data.message);
		else
			swal.error(res.data.message);
		
		await Temary(scope.course.id);

		scope.$apply();

	} 

	scope.deleteClass = (temary_class) => {

		scope.modelDelete = angular.copy(temary_class);

		swal.confirm('¿Si elimina esta clase, no podrá recuperarla?', async () => {

			await deleteClassApi();

		});
	}

	scope.openVideo = (video) => {

		scope.videoModal = sce.trustAsResourceUrl (scope.path + angular.copy(video.url_video));

		scope.sources = {
			videosources: [
				{ src : scope.videoModal, type: "video/mp4" }
			]
		};
		
		swal.openModal('modal-video',()=> {
			
			if (scope.APIVIDEO.currentState == 'play')
				scope.APIVIDEO.stop();
			
		});
	}

	scope.onPlayerReady = function(API) {

		scope.APIVIDEO = API;
		
	  };

 	scope.toggleAccordion = (temary,id) => {

		temary.collapsed = !temary.collapsed;

		scope.temaryList.filter(item => item.id != temary.id).forEach(item => item.collapsed = false);

		let accordion = $(`#${id}`);

		accordion.hasClass("show") ? accordion.collapse('hide') : accordion.collapse('show');
	
	} 

	scope.clear = () => {

		scope.objectModule = {};
		
		scope.objectClass = {}; 

		(scope.forms.module) ? scope.forms.module.$setPristine() : {};

		(scope.forms.temary_class) ? scope.forms.temary_class.$setPristine() : {};
		
	};

	scope.Init = async () => {

		scope.loader = true;
		
		await getTemary();

		scope.loader = false;
		
		scope.$apply();
  
		setTimeout(() => {  
            createDropzone();
			scope.loadDropzone();
			
			createDropzoneAdjuntos();
			scope.loadDropzoneAdjuntos();
		},500);
		
	};

}

TemaryCtrl.$inject = 
[
	'$scope',
	'link.factory',
	'swal.service',
	'cApp',
	'storage.service',
	'$location',
	'WizardHandler',
	'$sce',
	'helperDropzone'
];

const TemaryComponent =  () => {
	return {
		templateUrl : 'views/course/temary/temary.html',
		css         : 'views/course/temary/temary.css',
		controller: TemaryCtrl
	}
}

angular
	.module('app')
	.component('temary',TemaryComponent());