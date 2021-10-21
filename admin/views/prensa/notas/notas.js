import { dnComponent } from '../../../../../../../dine.js';

export default dnComponent({
    name: 'notas',
    fn: function (scope, fApi, fCrud, filter, sModal,root,sForm) {
        let Model = 'notas';
        scope.objectNotas = {};
        scope.normalView = true;
        scope.path = '../api/storage/app/'
 
        let ListEvent = () => {
            let i= 0;
            scope.listData = [];
            scope.loading = fCrud.getdata('notas')
                .then(res => {
                    scope.listData = res.success ? res.info : [];
                })
        };

        let ListEventUnavailable = () => {
            scope.loading = fCrud.trashed(Model)
                .then(res => scope.listData = res.success ? res.info : [])
        };
    

        scope.archivo_options = {
            dimentions: {
                width: 21800,
                height: 13600,
                size: 130240
            }
        };
        scope.loadImage = () => scope.default_image = './assets/img/sidebar/profile.png';

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
            scope.spin = false;
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
            if(scope.objectNotas.image == undefined)
                return sModal.error('Necesita subir una imagen');
            scope.spin = true;
            scope.loading_modal = fApi.image('notas',scope.objectNotas).then( res => {
                PostTransaction(res);
            });
        };

        scope.executeUpdate = () => {
            scope.spin = true;
            scope.loading_modal = fApi.image('notas/update',scope.objectNotas).then( res => {
                PostTransaction(res);
            });
        };

        scope.sendDataEvent = () => {
            scope.objectNotas.fecha_format = sForm.parseString(scope.objectNotas.fecha_publicacion);

            let operation = (scope.objectNotas.id == null) ? 'create' : 'update';

            operation == 'create' ? scope.executeCreate() : scope.executeUpdate();
            
        };
        
        scope.deleteEvent = () => {
            scope.loading = fCrud.executeDelete(Model, scope.objectNotas.id, PostTransaction);
        };
        scope.restoreEvent = () => {
            scope.loading = fCrud.executeRestore(Model, scope.objectNotas.id, PostTransactionUnavailable);
        };
        
        scope.openModal = (type, data) => { 
            scope.cleanForm();
            
            if (data) {
                scope.objectNotas = angular.copy(data);
            }
            switch (type) {
                case 0:
                    scope.loadImage();
                    scope.title = 'Agregar Nota';
                    sModal.open('modal-base-form');
                    break;
                case 1:
                    scope.default_image = scope.path + scope.objectNotas.src_imagen
                    scope.objectNotas.fecha_publicacion = sForm.parseDate(scope.objectNotas.fecha_publicacion);
                    scope.title = 'Actualizar Nota';
                    sModal.open('modal-base-form');
                    break;
                case 2:
                    sModal.question('¿Desea eliminar esta Nota de la lista?', scope.deleteEvent);
                    break;
                case 3:
                    sModal.question('¿Desea restaurar esta Nota de la lista?', scope.restoreEvent);
                    break;
            }
        };

        scope.cleanForm = () => {
            scope.errors = null;
            scope.objectNotas = {
                show:true , fecha_publicacion: sForm.hoy()
            };
        }; 

        scope.onInit = () => {
            ListEvent();
            scope.loadImage();
        };
    },
    templateUrl: './src/views/home/components/app/prensa/notas/notas.html',
    stylesUrl: './src/views/home/components/app/prensa/notas/notas.css',
    deps: [
        '$scope',
        'fApi',
        'fCrud',
        '$filter',
        'sModal',
        '$rootScope',
        'sForm'
    ]
});