'use strict';

let ServicioCtrl = ( scope, link, cApp,routeParams, rootScope) => {

	scope.currentTab = 'tab_1';

	scope.path = cApp().storage;
	scope.servicio_id 	  = routeParams.servicio_id;

	scope.subServicesList = [];
    scope.nosotros = {};

	/** http */  

    let getServicio = async (servicio_id) => {
        let res = await link.get(`page/servicio/${servicio_id}`);
        scope.servicio = res.data.success ? res.data.json : {};
    }
 
	let getServicios = async () => {
		let res = await link.get('page/get_servicios');
		scope.servicios = res.data.success ? res.data.json : [];
	}
	 
	let getSubServicesByServiceId = async (service_id) => {
		let res =  await link.get(`page/get_sub_services/${service_id}`);
		scope.subServicesList = res.data.success ? res.data.json : [];
	} 

	scope.changeTab = async (tab) => { 
		scope.spinnerServices = true;
		scope.tab = tab;
		await getSubServicesByServiceId(tab);
		scope.spinnerServices = false;
		scope.$apply();
	}
 
	let GetCursos = async () => {	
		let res = await link.get('page/get_cursos_top');
		scope.listCursos = res.data.success ? res.data.json : [];
	}

	scope.Init = async () => {

		rootScope.loader = true;
		
		await scope.changeTab('tab_1');

        await getServicio(scope.servicio_id);

		await GetCursos();
		
		await getServicios();

		rootScope.loader = false;
		
		scope.$apply();

        setTimeout(() => {

			/** imagenes carousel */

			$('#owl-imagenes').owlCarousel({
				center     : false,
				loop       : false,
				margin     : 14,
				nav        : true,
				slideBy    : 5,
				dots       : true,
				autoHeight: true,
				autoplayTimeout : 8000,
				navText    : ['',''],
				responsive : {          
					0   :{ items:1, nav:true, loop:false,dots:false},
					600 :{ items:1, nav:true, loop:false,dots:false},
					1000:{ items:1, nav:true, loop:false,dots:false}
				}
			});
 
		}, 100);  

		

    }

}

ServicioCtrl.$inject = ['$scope','link.factory','cApp','$routeParams','$rootScope'];

let ServicioComponent =  () => {
	return {
        templateUrl: "views/servicio/servicio.html",
        css:'views/servicio/servicio.css?v.1.2',
        controller: ServicioCtrl
	}
}

angular
	.module('app')
	.component('servicio' ,ServicioComponent());
   