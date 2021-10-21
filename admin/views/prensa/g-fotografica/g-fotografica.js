
'use strict';

let GaleriaFotograficaCtrl = (scope,link,sModal,utils,cApp,storage,location) => {

    scope.objectGaleria = {};
    scope.path = cApp().storage;

    let ListEvent = async () => {
        let res = await link.get_crud('App\\GaleriaImagenes');
        scope.listData = res.data.success ? res.data.json : [];
    };

    scope.archivo_options = {
        dimentions: {
            width: 28000000,
            height: 1600000,
            size: 10240000
        }
    };

    scope.loadImage = () => {

    };

    let PostTransaction = async (res) => {
        if (res.data.success) {
            sModal.closeModal('modal-base-form');
            sModal.success(res.data.message);
            await ListEvent();
            scope.spin = false;
        } else {
            scope.spin = false;
            sModal.error(res.data.errors);
        }
        scope.$apply(); 
    };

    scope.sendDataEvent = async () => {
        scope.spin = true;
        let res =  (scope.objectGaleria.id == null) 
        ? await link.formData('galeria/create',scope.objectGaleria)
        : await link.formData('galeria/update',scope.objectGaleria);
        await PostTransaction(res);
    };
    
    scope.addImagenes = item => {
        location.path('galeria_imagenes/'+item.id);
    }; 
    
    scope.deleteEvent = () => {
        scope.loading = link.deletes('galeria/delete/' + scope.objectGaleria.id).then(res => PostTransaction(res));
    };

    scope.restoreEvent = () => {
        scope.loading = fCrud.executeRestore(Model, scope.objectGaleria.id, PostTransactionUnavailable);
    };
    
    scope.openModal = (type, data) => { 
        scope.cleanForm();
        console.log(data);
        if (data) {
            scope.objectGaleria = angular.copy(data);
        }
        switch (type) {
            case 0:
                scope.loadImage();
                scope.title = 'Agregar Galería';
                scope.default_image = 'undefined.jpg';
                sModal.openModal('modal-base-form');
                break;
            case 1:
                scope.default_image = scope.path + scope.objectGaleria.image;
                scope.objectGaleria.fecha_publicacion = utils.ParseDate(data.fecha_publicacion);
                scope.title = 'Actualizar Galería';
                sModal.openModal('modal-base-form');
                break;
            case 2:
                sModal.confirm('¿Desea eliminar esta Galería de la lista?', scope.deleteEvent);
                break;
            case 3:
                sModal.question('¿Desea restaurar esta Galería de la lista?', scope.restoreEvent);
                break;
        }
    };

    scope.cleanForm = () => {
        scope.errors = null;
        scope.objectGaleria = {
            fecha_publicacion: utils.hoy()
        };
    };

    scope.onInit = async () => {
        await ListEvent();
        scope.loadImage();
        scope.$apply();
    };
}


GaleriaFotograficaCtrl.$inject = [
    '$scope',
    'link.factory',
    'swal.service',
    'utils.service',
    'cApp',
    'storage.service',
    '$location'
];

let GaleriaFotograficaController =  () => {
	return {
		templateUrl: "views/prensa/g-fotografica/g-fotografica.html",
		css: 'views/prensa/g-fotografica/g-fotografica.css',
        controller: GaleriaFotograficaCtrl
	}
}  
 
angular 
	.module('app')
    .component('galeriaFotografica',GaleriaFotograficaController());
