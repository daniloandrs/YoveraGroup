'use strict';

let HomeCtrl = ( scope, link, cApp,window ) => {

	scope.path = cApp().storage;
	scope.currentYear = moment();

	let GetBanner = async () => {
		let res = await link.get('page/get_banner');
		scope.listBanner = res.data.success ? res.data.json : [];
	};

	scope.setMessageWhatsapp = (banner) => {
        return `Hola necesito información sobre este servicio :  ${banner.title}, en el sitio web www.yoveragroup.com`;
    };

    scope.adquirirServicio = (banner) => {
		let encode =  `https://wa.me/${scope.number}?text=${encodeURI(scope.setMessageWhatsapp(banner))}`;
		window.open(encode,'_blank');
    }

	let getServicios = async () => {
		let res = await link.get('page/get_servicios');
		scope.servicios = res.data.success ? res.data.json : [];
	}

	let Configuraciones = async () => {
		let res = await link.get('page/configuraciones');
		scope.configuraciones = res.data.success ? res.data.json : {};
		scope.number = scope.configuraciones.telefono_whatsapp;
	}; 

	let GetCursos = async () => {	
		let res = await link.get('page/get_cursos');
		scope.listCursos = res.data.success ? res.data.json : [];
	}
	
	scope.isNavidad = () => {
		let navidadStart = moment('12-23-2020 00:00:00',"MM-DD-YYYY HH:mm:ss");
		let navidadEnd   = moment('12-26-2020 00:00:00',"MM-DD-YYYY HH:mm:ss");
		return (scope.currentYear.isAfter(navidadStart) && scope.currentYear.isBefore(navidadEnd))
	};

	let GetClientes = async () => {	
		let res = await link.get('page/get_clientes');
		scope.clientes = res.data.success ? res.data.json : [];
	}

	scope.Init = async () => {
		scope.loader = true;
		await GetBanner();
		await GetCursos();
		await Configuraciones();
		await getServicios();
		await GetClientes();

		setTimeout(() => {

			/** banner carousel  */

			$('#owl-banner').owlCarousel({
				center     : false,
				loop       : true,
				margin     : 0,
				nav        : true,
				autoplay   : false,
				autoHeight:true,
				slideBy    : 1,
				autoplayTimeout : 5000,
				navText    : ["",""],
				responsive : {          
					0   :{ items:1, nav:false, loop:true,dots:false},

					600 :{ items:1, nav:true, loop:true,dots:false},

					1000:{ items:1, nav:true, loop:true, dots:false}
				}
			});
			

			/** cursos carousel */

			$('#owl-cursos').owlCarousel({
				center     : false,
				loop       : false,
				margin     : 14,
				nav        : true,
				slideBy    : 5,
				dots       : true,
				autoplayTimeout : 5000,
				navText    : ["",""],
				responsive : {          
					0   :{ items:1, nav:true, loop:false},

					600 :{ items:2, nav:true, loop:false},

					1000:{ items:5, nav:true, loop:false, dots:false}
				}
			});

 
			/** cursos carousel */

			$('#owl-clientes').owlCarousel({
				center     : false,
				loop       : false,
				margin     : 14,
				nav        : true,
				slideBy    : 5,
				dots       : true,
				autoplayTimeout : 5000,
				navText    : ["",""],
				responsive : {          
					0   :{ items:1, nav:true, loop:false},

					600 :{ items:2, nav:true, loop:false},

					1000:{ items:5, nav:true, loop:false, dots:false}
				}
			});

		}, 100);  

		scope.loader = false;

		scope.$apply();

	};

}

HomeCtrl.$inject = ['$scope','link.factory','cApp','$window'];

let HomeComponent =  () => {
	return {
		templateUrl: "views/home/home.html",
		css:'views/home/home.css',
        controller: HomeCtrl
	}
}

angular
	.module('app')
	.component('home' ,HomeComponent());
