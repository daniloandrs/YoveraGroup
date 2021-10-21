'use strict';

let ClienteCtrl = ( scope, link, swal,cApp) => {

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

    let getClientes = async () => {
        let res = await link.get('cliente/get');
        scope.clienteList = res.data.success ? res.data.json : [];
        scope.$apply();
    } 

    scope.openModal = () => {

        scope.clearDefault = {
            file : Date.now(),
            isDeleted : true
        }

        scope.default_image = 'undefined.png';

        scope.object = {
            image : undefined
        };

        swal.openModal('modal-base');
    }  

    scope.saveCliente = async () => {

        scope.spinForm = true;        
        let res = scope.object.id 
            ? await link.formData('cliente/edit',scope.object)  
            : await link.formData('cliente/create',scope.object);
         
        if (res.data.success) {
            await getClientes();
            scope.object = {
                image : undefined
            };
            scope.spinForm = false;
            swal.closeModal('modal-base');
            swal.success(res.data.message);
            scope.$apply();
            
        }
    }

    scope.editCliente = (servicio) => {
        scope.default_image = 'undefined.png';
        scope.clearDefault = {
            file : Date.now(),
            isDeleted : true
        }
        scope.object = {
            id: servicio.id,
            image: "",
            nombre: servicio.nombre
        }
        scope.default_image = scope.path + servicio.imagen;

        swal.openModal('modal-base');
    }
    
    let deleteClienteSend = async () => {
        let res = await link.deletes('cliente/delete/'+scope.cliente_deleted.id);
        if (res.data.success) {
            await getClientes();
            scope.$apply();
        }
    };

    scope.deleteCliente = (cliente) => {
        scope.cliente_deleted = angular.copy(cliente);
        swal.confirm('¿Seguro que desea eliminar este cliente?',deleteClienteSend);
    };


    scope.Init = async () => {
        scope.loader = true;
        await getClientes();
        scope.loader = false;
        scope.$apply();
    }

}

ClienteCtrl.$inject = [
    '$scope',
    'link.factory',
    'swal.service',
    'cApp'
];

let ClienteComponent =  () => {
	return {
        templateUrl: "views/cliente/cliente.html",
        css:'views/cliente/cliente.css',
        controller: ClienteCtrl
	}
}

angular
	.module('app')
	.component('cliente' ,ClienteComponent());
