
'use strict';

const BannerCtrl = (scope, link, swal, cApp, utils) => {

    let Model = '\\App\\Banner';   
    
    scope.forms = {};

    scope.objectBanner = {};

    scope.modelTitle = 'Banner';

	scope.path = cApp().storage;

    scope.optionsImage =  {  
		multiple : false,
		type : 'image',
		dimentions : {
			size : 1000000,
			height : 1000000,
			width : 10000000
		}
    }
	
	let getData = async () => {

		let res = await link.get_crud(Model);
		
		scope.listBanner = res.data.success ? res.data.json : [];
		
		let i = 0;

		angular.forEach(scope.listBanner,(value) => {
			value.position_key = i++;
		});

	};

	scope.editModal = (item) => {

		scope.objectBanner = angular.copy(item);
		
		scope.titleModal = `Actualizar ${scope.modelTitle}`;
		
		scope.title_button = 'Actualizar';
		
		scope.create_opcion = false;
		
		scope.default_banner_image = scope.path + item.banner_image;

		swal.openModal('modal-crud');
	
	};

    scope.createModal = () => {

        scope.create_opcion = true;
		
		scope.titleModal = `Crear ${scope.modelTitle}`;
		
		scope.title_button = 'Crear';
		
		scope.clear();
		
		scope.default_banner_image = 'undefined.jpg';

		swal.openModal('modal-crud');
	}
	
	scope.createModal = () => {

        scope.create_opcion = true;
		
		scope.titleModal = `Crear ${scope.modelTitle}`;
		
		scope.title_button = 'Crear';
		
		scope.clear();
		
		scope.default_banner_image = 'undefined.jpg';

		swal.openModal('modal-crud');
    }

	scope.postSend = async (message) => {
		
		await getData();

		swal.closeModal('modal-crud');
		
		swal.success(message);
		
		scope.clear();
		
		scope.spinFrom = false;

	};

	scope.errorSend = (message) => {

		swal.error(message);
		
		scope.spinFrom = false;
	
	};

	scope.send = async () => {
  
		scope.spinFrom = true;
		
		let res = (scope.objectBanner.id == null) 
				? await link.formData('banner/create',scope.objectBanner) 
				: await link.formData('banner/update',scope.objectBanner);

		res.data.success ? await scope.postSend(res.data.message) : scope.errorSend(res.data.message);

		scope.$apply();

	};
	
	scope.deleteModal = (item) => {

		scope.itemDeleted = angular.copy(item);

		swal.confirm('¿Seguro que desea eliminar este banner?', scope.deleteEvent);
	};

	scope.deleteEvent = async () => {
		
		scope.loader = true;  

		let res = await link.deletes(`banner/${scope.itemDeleted.id}`);
		
		res.data.success ? await scope.postSend(res.data.message) : scope.errorSend(res.data.message);
		
		scope.loader = false;

		scope.$apply();
	};

	scope.updateOrden = async (keys) => {
		
		scope.loader = true;

		let res = await link.post('banner/update_order',keys);
		
		res.data.success ? await scope.postSend(res.data.message) : scope.errorSend(res.data.message);
		
		scope.loader = false;

		scope.$apply();
	};

	scope.stopCallback = async (event, ui,item) => {

		let nueva = scope.listBanner[item.position_key];
		
		let keys = {anterior_posicion_id:item.id,nueva_posicion_id:nueva.id};
		
		if(keys.anterior_posicion_id != keys.nueva_posicion_id)
			await scope.updateOrden(keys);
	
		}; 

    scope.clear = () => {
   
		scope.objectBanner = {

            banner_image : undefined
            
        };
		
		(scope.forms.banner) ? scope.forms.banner.$setPristine() : {};

	};
  
    scope.Init = async () => { 
		
		scope.loader = true;

		await getData();

		scope.loader = false;
		
		scope.$apply();

    };
}

BannerCtrl.$inject = ['$scope','link.factory','swal.service','cApp','utils.service'];

const BannerComponent =  () => {
	return {
		templateUrl:'views/banner/banner.html',
		css:'views/banner/banner.css',
		controller: BannerCtrl
	}
}

angular
	.module('app')
	.component('banner',BannerComponent());