'use strict';

let ServicioDetalleCtrl = ( scope, link, swal,cApp,storage,routeParams,helperDropzone) => {

    scope.path = cApp().storage;

    scope.spinForm = false;

    scope.clearDefault = {};
    scope.forms = {
        base : null
    }

    scope.files = [];
    scope.subSeleted = {};

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

    scope.routeDropzone = link.routeDropzone(`sub_servicio/add_images`);
    let token = storage.get('user').token;
    let createDropzone = () => {
        if (document.getElementById('myGalleryBook')) {
            scope.dropzone = helperDropzone.configDropzone('myGalleryBook',scope.routeDropzone,'files',token);
        }
    } 
 
    let getServicio = async () => {
        scope.servicio_id = routeParams.servicio_id;
        let res = await link.get('sub_servicio/get_by_servicio/'+scope.servicio_id);
        scope.servicio = res.data.success ? res.data.json : {};
        scope.$apply();
    } 

    scope.openModal = () => {
        quill.root.innerHTML = '';
        scope.object = {};
        (scope.forms.base) ? scope.forms.base.$setPristine() : {};
        swal.openModal('modal-base');
    }  

    scope.deleteServicio = (sub) => {
        swal.confirm('¿Seguro que desea eliminar esta imagen ?', () =>{
            sub.spin = true;
            link.deletes('sub_servicio/delete_image/'+sub.id).then(res => {
                if(res.data.success){
                    getServicio();
                    swal.success(res.data.message);
                    scope.$apply();
                } else {
                    swal.error(res.data.message);
                }
            });
        });
    } 
    
    scope.save = async () => {

        scope.spinForm = true;        
        scope.object.servicio_id = scope.servicio_id; 
        scope.object.contenido = quill.root.innerHTML;

        let res = scope.object.id 
            ? await link.formData('sub_servicio/edit',scope.object)  
            : await link.formData('sub_servicio/create',scope.object);
         
        if (res.data.success) {
            await getServicio();
            scope.$apply();
            scope.spinForm = false;
            swal.closeModal('modal-base');
        }
    }

    scope.toggleAccordion = (sub,id) => {
		sub.collapsed = !sub.collapsed;
		scope.servicio.subservicios.filter(item => item.id != sub.id).forEach(item => item.collapsed = false);
		let accordion = $(`#${id}`);
		accordion.hasClass("show") ? accordion.collapse('hide') : accordion.collapse('show');
	} 

    scope.editSub = (sub) => {
        scope.object = {
            id: sub.id,
            servicio_id : scope.servicio_id,
            nombre : sub.nombre
        }
        quill.root.innerHTML = sub.editor.contenido;
        swal.openModal('modal-base');
    }

    let deleteSubSend = async () => {
        let res = await link.deletes('sub_servicio/delete/'+scope.sub_deleted.id);
        if (res.data.success) {
            await getServicio();
            scope.$apply();
        }
    };

    scope.deleteSub = (sub) => {
        scope.sub_deleted = angular.copy(sub);
        swal.confirm('¿Seguro que desea eliminar este sub servicio?',deleteSubSend);
    };


    /**imagenes  */
    
    scope.addImages = (item) => {
        scope.subSeleted = angular.copy(item);
        swal.openModal('modal-galeria');
    }   

    scope.clearImages = function () {
        scope.flagImages = false;
        scope.dropzone.removeAllFiles(); 
        scope.imagesDeletes = [];
    }

    scope.loadDropzone = () => {

        scope.clearImages();

        scope.images = angular.copy(scope.photos);
        
        angular.forEach(scope.images,function(value,key){
            var lenghtName = value.url_image.length;
            var storage = './api/storage/app/';
            var mockFile = { 
                name: value.url_image, 
                size: 41690,
                accepted:true,
                type: 'image/'+ value.url_image.substr(lenghtName-3,lenghtName),
                status: Dropzone.ADDED,
                upload:{
                    bytesSent : 43404,
                    progress : 100,
                    total : 41690
                },
                height : 1500,
                width: 2000 
            };  
            scope.dropzone.emit("addedfile", mockFile);
            scope.dropzone.emit("thumbnail", mockFile, storage + value.url_image + '?' + (new Date()).getTime());
            scope.dropzone.emit("complete",mockFile);
            scope.dropzone.files.push(mockFile);
            if(scope.dropzone.files.length > 20) {
                scope.dropzone.emit("maxfilesexceeded",mockFile);
            } 

        });
        
        scope.dropzone.on('sendingmultiple',function(file, response,formData){
            formData.append('sub_servicio_id',scope.subSeleted.id);
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
                swal.closeModal('modal-galeria');
                swal.success(response.message);
                await getServicio();
                scope.flagImages = false;
                scope.spin_gallery = false;
            }  else {
                swal.error('Algo ha salido mal :c .');
                scope.spin_gallery = false;
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

    scope.sendDataEvent = () => {
        if(scope.dropzone.getQueuedFiles().length > 0) {
            scope.spin_gallery = true;
            scope.dropzone.processQueue();
        } else {
           return swal.error('No hay imágenes para subir.');
        }

        if(scope.imagesDeletes.length > 0 ) {
            var jsonUpdateImages = {
                deletes: scope.imagesDeletes
            };
            fApi.post('gallery/delete',jsonUpdateImages)
            .then(res => {
                !res.success ?  swal.error(res.message) : '';
            });
        }
    }

    scope.Init = async () => {
        scope.loader = true;
        await getServicio();
        scope.loader = false;
        scope.$apply();
        setTimeout(() => {  
            quill = new Quill('#editor', {
                theme: 'snow',
                modules: {  
                    toolbar: toolbarOptions
                },
            });

            /**dropnoze */
            createDropzone();
            scope.loadDropzone();

        },100);
    }

}

ServicioDetalleCtrl.$inject = [
    '$scope',
    'link.factory',
    'swal.service',
    'cApp',
    'storage.service',
    '$routeParams',
    'helperDropzone'
];

let ServicioDetalleComponent =  () => {
	return {
        templateUrl: "views/servicio-detalle/servicio-detalle.html",
        css:'views/servicio-detalle/servicio-detalle.css',
        controller: ServicioDetalleCtrl
	}
}

angular
	.module('app')
	.component('servicioDetalle',ServicioDetalleComponent());
