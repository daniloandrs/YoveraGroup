'use strict';

let SubServicioCtrl = ( scope, link, swal, cApp,routeParams) => {

	scope.currentTab = 'tab_1';

	scope.path = cApp().storage;
	scope.servicio_id 	  = routeParams.servicio_id;
  	scope.sub_servicio_id = routeParams.sub_servicio_id;

	scope.subServicesList = [];
    scope.nosotros = {};

	/** http */

	let GetCursos = async () => {	
		let res = await link.get('page/get_cursos_top');
		scope.listCursos = res.data.success ? res.data.json : [];
	}

    let getSubservicio = async (servicio_id,sub_servicio_id) => {
        let res = await link.get(`page/sub_servicio/${servicio_id}/${sub_servicio_id}`);
        scope.subServicio = res.data.success ? res.data.json : {};
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

	scope.Init = async () => {

		scope.loader = true;
		
		await scope.changeTab('tab_1');

        await getSubservicio(scope.servicio_id,scope.sub_servicio_id);

		await GetCursos();

		await getServicios();

		scope.loader = false;
	

        setTimeout(() => {

			/** imagenes carousel */

			$('#owl-imagenes').owlCarousel({
				center     : false,
				loop       : false,
				margin     : 14,
				nav        : true,
				slideBy    : 5,
				dots       : true,
				autoHeight : true,
				autoplayTimeout : 8000,
				navText    : ['',''],
				responsive : {          
					0   :{ items:1, nav:true, loop:false,dots:true},
					600 :{ items:1, nav:true, loop:false,dots:true},
					1000:{ items:1, nav:true, loop:false,dots:true}
				}
			});
 
		}, 100);  

		scope.$apply();

    }

}

SubServicioCtrl.$inject = ['$scope','link.factory','swal.service','cApp','$routeParams'];

let SubServicioComponent =  () => {
	return {
        templateUrl: "views/sub-servicio/sub-servicio.html",
        css:'views/sub-servicio/sub-servicio.css',
        controller: SubServicioCtrl
	}
}

angular
	.module('app')
	.component('subServicio' ,SubServicioComponent());
