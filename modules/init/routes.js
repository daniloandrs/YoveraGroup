
'use strict';

let Routing = (route, location,cssProvider) => {
	
	route
		.when('/',{ 
			template : '<home></home>' 
		})
		.when('/nosotros',{ 
			template : '<nosotros></nosotros>' 
		})
		.when('/mision',{ 
			template : '<mision></mision>' 
		})
		.when('/vision',{ 
			template : '<vision></vision>' 
		})
		.when('/servicios/:servicio_id/:sub_servicio_id',{ 
			template : '<sub-servicio></sub-servicio>' 
		})
		.when('/servicio/:servicio_id',{ 
			template : '<servicio></servicio>' 
		})
		.when('/contactanos',{ 
			template : '<contact-view></contact-view>' 
		})
		.when('/cursos',{ 
			template : '<cursos></cursos>' 
		})
		.when('/cursos/:url_curso',{
			template : '<curso-detalle-view></curso-detalle-view>'
		})
		.when('/login',{
			template : '<login></login>'
		})
		.when('/mis_cursos',{
			template : '<mis-cursos></mis-cursos>'
		})
		.when('/mis_cursos/:url_curso',{
			template : '<mis-cursos-detalle></mis-cursos-detalle>'
		})
		.when('/clientes',{
			template : '<cliente></cliente>'
		})
		.when('/galeria_imagenes',{
			template : '<galeria-imagen></galeria-imagen>'
		})
		.otherwise({
			redirectTo:'/'
		})

	location.hashPrefix('')
	
	angular.extend(cssProvider.defaults, {
		container: 'head',
		method: 'append',
		persist: true,
		preload: true,
		bustCache: false
	});
	
}

Routing.$inject = ['$routeProvider','$locationProvider','$cssProvider']

angular
    .module('app')
    .config(Routing)
