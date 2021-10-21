import { dnComponent } from '../../../../../../../dine.js';

export default dnComponent({
    name: 'galeriaVideos',
    fn: function (scope, fApi, fCrud, filter, sModal,root,sce,sForm) {
        let Model = 'galeria_videos';
        scope.objectVideo = {};
        scope.normalView = true;
        scope.path = '../api/storage/app/'
        scope.forms = {
            form_base  : null
        };

        let ListEvent = () => {
            let i= 0;
            scope.listData = [];
            scope.loading = fCrud.getdata('galeria_videos')
                .then(res => {
                    scope.listData = res.success ? res.info : [];
                })
        };

        let ListEventUnavailable = () => {
            scope.loading = fCrud.trashed(Model)
                .then(res => scope.listData = res.success ? res.info : [])
        };
    
        scope.loadImage = () => scope.default_image = 'avatars/avatar.png';
        scope.archivo_options = {
            dimentions: {
                width: 2800,
                height: 1600,
                size: 10240
            }
        };

        let PostTransaction = res => {
            if (res.success) {
                sModal.close('modal-base-form');
                sModal.success(res.message);
                ListEvent();
            } else {
                if (res.errors) {
                    scope.errors = res.errors;
                    angular.forEach(scope.errors, function (value, key) {
                        sModal.error(value);
                    });
                }
                if (res.message) {
                    sModal.error(res.message);
                }
            }
        };

        let PostTransactionUnavailable = res => {
            if (res.success) {
                sModal.success(res.message);
                ListEventUnavailable();
            } else sModal.warning(res.message);
        };
        
        scope.toggleView = () => {
            scope.normalView = !scope.normalView;
            if (!scope.normalView) {
                ListEventUnavailable();
            } else {
                ListEvent();
            }
        };

        scope.executeCreate = () => {
            if(scope.objectVideo.image == null)
                return sModal.error('Agregue una imagen de Fondo');
            
            scope.loading_modal = fApi.image('galeria_videos',scope.objectVideo).then( res => {
                PostTransaction(res);
            });
        };

        scope.executeUpdate = () => {
            scope.loading_modal = fApi.image('galeria_videos/update',scope.objectVideo).then( res => {
                PostTransaction(res);
            });
        };

        scope.sendDataEvent = () => {
            scope.objectVideo.fecha_format = sForm.parseString(scope.objectVideo.fecha_publicacion);
            let operation = (scope.objectVideo.id == null) ? 'create' : 'update';

            operation == 'create' ? scope.executeCreate() : scope.executeUpdate();
            
        };
        
        scope.deleteEvent = () => {
            scope.loading = fCrud.executeDelete(Model, scope.objectVideo.id, PostTransaction);
        };
        scope.deleteEvent = () => {
            scope.loading = fApi.post('galeria_videos/delete',{id:scope.objectVideo.id}).then(res => PostTransaction(res));
        };

        scope.restoreEvent = () => {
            scope.loading = fCrud.executeRestore(Model, scope.objectVideo.id, PostTransactionUnavailable);
        };
        
        scope.openModal = (type, data) => { 
            scope.cleanForm();
            
            if (data) {
                scope.objectVideo = angular.copy(data);
            }
            switch (type) {
                case 0:
                    scope.loadImage();
                    
                    scope.title = 'Agregar Video';
                    sModal.open('modal-base-form');
                    break;
                case 1:
                    scope.default_image =  scope.path + scope.objectVideo.imagen_referencial 
                    scope.objectVideo.fecha_publicacion = scope.objectVideo.fecha_publicacion ?  sForm.parseDate(scope.objectVideo.fecha_publicacion) : new Date();
                    
                    scope.title = 'Actualizar Video';
                    sModal.open('modal-base-form');
                    break;
                case 2:
                    sModal.question('¿Desea eliminar este Video de la lista?', scope.deleteEvent);
                    break;
                case 3:
                    sModal.question('¿Desea restaurar este Video de la lista?', scope.restoreEvent);
                    break;
            }
        };

        scope.cleanForm = () => {
            scope.errors = null;
            scope.objectVideo = {
                fecha_publicacion: sForm.hoy()
            };
            (scope.forms.form_base  != undefined) ? scope.forms.form_base.$setPristine() : '' ;
        };

        scope.onInit = () => {
            ListEvent();
            scope.loadImage();
        };
    },
    templateUrl: './src/views/home/components/app/prensa/g-audiovisual/g-audiovisual.html',
    stylesUrl: './src/views/home/components/app/prensa/g-audiovisual/g-audiovisual.css',
    deps: [
        '$scope',
        'fApi',
        'fCrud',
        '$filter',
        'sModal',
        '$rootScope',
        '$sce',
        'sForm'
    ]
});