
'use strict';

let GaleriaItemCtrl = (scope,link,sModal,utils,cApp,storage,location,helperDropzone,routeParams) => {
    
    scope.galeria = {};
    scope.imagenesList = [];
    scope.objectEdit = {};

    scope.path = cApp().storage; 

    scope.optionsFile =  {  
		multiple : false,
		type : 'image',
		dimentions : {
			size : 1000000,
			height : 1000000,
			width : 10000000
		}
    }

    /**Api */

    let getImagenes = async () => {
        scope.galeriaID = routeParams.item; 
        if(scope.galeriaID == null)
            return location.path('galeria_imagenes');

        let res = await link.get(`galeria/get_imagenes/${scope.galeriaID}`);
        scope.imagenesList = res.data.success ? res.data.json : [];
        scope.$apply();
    } 


    let token = storage.get('user').token;

    scope.routeDropzone = link.routeDropzone(`galeria/add_imagenes`);
     
    scope.clearImages = function () {
        scope.flagImages = false;
        scope.dropzone.removeAllFiles(); 
        scope.imagesDeletes = [];
    }

    let createDropzone = () => {
        if (document.getElementById('galeria')) {
            scope.dropzone = helperDropzone.configDropzone('galeria',scope.routeDropzone,'files',token);
        }
    } 


    scope.loadDropzone = () => {
        scope.clearImages();
        scope.dropzone.on('sendingmultiple',function(file, response,formData){
            formData.append('galeria_id',scope.galeriaID);
        });

        scope.dropzone.on('addedfile',function(file){
            scope.files = file;
            scope.$apply();
        });

        scope.dropzone.on("processing", function(file,operation) {
            this.options.url = scope.routeDropzone;
        });

        scope.dropzone.on('successmultiple',async function(file,response){
            console.log(response);
            if(response.success) {            
                await getImagenes();
                scope.clearImages();
                scope.spin_dropzone = false;
                sModal.success(response.message);  
                sModal.closeModal('modal-base-form');
                scope.$apply();
            }  else {
                sModal.error('Algo ha salido mal :c .');
                scope.spin_dropzone = false;
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
    };

    scope.sendDataEvent = () => {
        if(scope.dropzone.getQueuedFiles().length > 0) {
            scope.spin_dropzone = true;
            scope.dropzone.processQueue();
        } else {
           return swal.error('No hay imágenes para subir.');
        }
    }

    scope.addImages = () =>  {
        sModal.openModal('modal-base-form');
    };

    scope.editImage = (image) => {
        scope.objectEdit = angular.copy(image);
        scope.objectEdit.galeria_id = scope.galeriaID;
        scope.default_image = scope.path + image.directorio + '/' + image.url;
        sModal.openModal('modal-edit-form');
    };


    scope.updateImage = async () => {
        scope.spinForm = true;
        let res = await link.formData('galeria/update_imagen_item',scope.objectEdit);
        if(res.data.success) {
            sModal.closeModal('modal-edit-form');
            sModal.success(res.data.message);
            await getImagenes();
            scope.spinForm = false;
            
        } else {
            sModal.error(res.data.error);
        }
    };  


    scope.deleteImage = (item) => {
        sModal.confirm('¿Seguro que desea eliminar esta imagen?', async () => {
            let res = await link.deletes('galeria/delete_image/'+item.id);
            if(res.data.success) {
                sModal.success(res.data.message);
                await getImagenes();
            } else {
                sModal.error(res.data.error);
            }
        });
    };

    scope.onInit = async () => {
        scope.loader = true;
        await getImagenes();
        scope.loader = false;
        scope.$apply();

        setTimeout(() => {  
            createDropzone();
            scope.loadDropzone();
        },100);
    };

}


GaleriaItemCtrl.$inject = [
    '$scope',
    'link.factory',
    'swal.service',
    'utils.service',
    'cApp',
    'storage.service',
    '$location',
    'helperDropzone',
    '$routeParams',
];

let GaleriaItemController =  () => {
	return {
		templateUrl: "views/prensa/g-fotografica/g-item/g-item.html",
		css: 'views/prensa/g-fotografica/g-item/g-item.css',
        controller: GaleriaItemCtrl
	}
}  
 
angular 
	.module('app')
    .component('galeriaItem',GaleriaItemController());