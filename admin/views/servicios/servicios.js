'use strict';

let ServiciosCtrl = ( scope, link, swal,cApp,storage,location,helperDropzone) => {

    scope.path = cApp().storage;

    scope.spinForm = false;

    scope.clearDefault = {};
    scope.forms = {
        base : null
    }

    scope.servicioSelected = {};

    scope.optionsFile =  {  
		multiple : false,
		type : 'image',
		dimentions : {
			size : 1000000,
			height : 1000000,
			width : 10000000
		}
    }
    
    scope.object = {};

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

    let getServicios = async () => {
        let res = await link.get('servicios/get');
        scope.serviciosList = res.data.success ? res.data.json : [];
        scope.$apply();
    } 

    scope.openModal = () => {

        scope.clearDefault = {
            file : Date.now(),
            isDeleted : true
        }

        //quill.root.innerHTML = '';

        scope.default_image = 'undefined.png';

        scope.object = {
            image : undefined
        };

        swal.openModal('modal-base');
    }  

    scope.saveServicio = async () => {

        scope.spinForm = true;        

        //scope.object.contenido = quill.root.innerHTML;

        let res = scope.object.id 
            ? await link.formData('servicios/edit',scope.object)  
            : await link.formData('servicios/create',scope.object);
         
        if (res.data.success) {
            await getServicios();
            scope.object = {
                image : undefined
            };
            scope.spinForm = false;
            swal.closeModal('modal-base');
            swal.success(res.data.message);
            scope.$apply();
            
        }
    }

    scope.editServicio = (servicio) => {

        scope.default_image = 'undefined.png';

        scope.clearDefault = {
            file : Date.now(),
            isDeleted : true
        }
        
        scope.object = {
            id: servicio.id,
            image: "",
            descripcion : servicio.descripcion,
            nombre: servicio.nombre
        }
        
        //quill.root.innerHTML = servicio.editor.contenido;
        scope.default_image = scope.path + servicio.icono;

        swal.openModal('modal-base');
    }
    
    let deleteServicioSend = async () => {
        let res = await link.deletes('servicios/delete/'+scope.servicio_deleted.id);
        if (res.data.success) {
            await getServicios();
            scope.$apply();
        }
    };

    scope.deleteServicio = (servicio) => {
        scope.servicio_deleted = angular.copy(servicio);
        swal.confirm('¿Seguro que desea eliminar este servicio?',deleteServicioSend);
    };

    scope.goToGestionar = (servicio) => {
        storage.set('servicio',servicio);
        location.path('servicios/'+servicio.id);
    }


    scope.goToAddContenido = (servicio) => {
        quill.root.innerHTML = servicio.editor?.contenido ?servicio.editor.contenido : '';
        scope.servicioSelected = angular.copy(servicio);
        swal.openModal('modal-editor');  
    }

    scope.saveContent = async () => {
        let json = {
            servicio_id : scope.servicioSelected.id,
            contenido : quill.root.innerHTML
        };
        let res = await link.post('servicios/update_contenido',json);
        if(res.data.success) {
            swal.success(res.data.message);
            await getServicios();
            swal.closeModal('modal-editor');
        } else {
            swal.error(res.data.message);
        }
    };

    /**dropzone  zone  */

    scope.goToAddImages = (servicio) => {
        scope.clearImages();
        scope.servicioSelected = angular.copy(servicio);
        swal.openModal('modal-galeria');  
    };  

    scope.routeDropzone = link.routeDropzone(`servicios/add_images`);
    let token = storage.get('user').token;
      
    let createDropzone = () => {
        if (document.getElementById('servicesImages')) {
            scope.dropzone = helperDropzone.configDropzone('servicesImages',scope.routeDropzone,'files',token);
        }
    } 

    scope.clearImages = function () {
        scope.flagImages = false;
        scope.dropzone.removeAllFiles(); 
        scope.imagesDeletes = [];
    }
    

    scope.loadDropzone = () => {

        scope.clearImages();

        scope.dropzone.on('sendingmultiple',function(file, response,formData){
            formData.append('servicio_id',scope.servicioSelected.id);
        });

        scope.dropzone.on('addedfile',function(file){
            scope.files = file;
            scope.$apply();
        });

        scope.dropzone.on("processing", function(file,operation) {
            this.options.url = scope.routeDropzone;
        });

        scope.dropzone.on('successmultiple',async function(file,response){
            if(response.success) {            
                await getServicios();
                scope.clearImages();
                let tmp = scope.serviciosList.find(i => i.id == scope.servicioSelected.id);
                scope.servicioSelected = angular.copy(tmp);
                scope.flagImages = false;
                scope.spin_image = false;
                swal.success(response.message);
                scope.$apply();
            }  else {
                swal.error('Algo ha salido mal :c .');
                scope.spin_image = false;
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


    scope.deleteImageServicio = (image) => {
       
        swal.confirm('¿Seguro que desea eliminar esta imagen?',async () => {
            image.spin = true;
            let res = await link.deletes('servicios/delete_image_table/' + image.id);
            if(res.data.success) {
                swal.success(res.data.success);
                await getServicios();
                let tmp = scope.serviciosList.find(i => i.id == scope.servicioSelected.id);
                scope.servicioSelected = angular.copy(tmp);
                scope.$apply();
            }
        });
    }

    scope.sendDataEvent = () => {
        if(scope.dropzone.getQueuedFiles().length > 0) {
            scope.spin_image = true;
            scope.dropzone.processQueue();
        } else {
           return swal.error('No hay imágenes para subir.');
        }

    }


    scope.Init = async () => {
        scope.loader = true;
        await getServicios();
        scope.loader = false;
        scope.$apply();

        setTimeout(() => {  
            quill = new Quill('#editor', {
                theme: 'snow',
                modules: {  
                    toolbar: toolbarOptions
                },
            });

            createDropzone();
            scope.loadDropzone();

        },100);

    }

}

ServiciosCtrl.$inject = [
    '$scope',
    'link.factory',
    'swal.service',
    'cApp',
    'storage.service',
    '$location',
    'helperDropzone'
];

let ServiciosComponent =  () => {
	return {
        templateUrl: "views/servicios/servicios.html",
        css:'views/servicios/servicios.css',
        controller: ServiciosCtrl
	}
}

angular
	.module('app')
	.component('servicios' ,ServiciosComponent());
