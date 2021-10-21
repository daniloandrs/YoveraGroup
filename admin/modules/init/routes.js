
'use strict';

let Routing = (route, location,cssProvider) => {
	
	route
	.when('/home',{ 
		template : '<home><home>' 
	})
	.when('/menu',{ 
		template : '<dashboard></dashboard>' 
	}) 
	.when('/menu/administrar',{ 
		template : '<dashboard-administrar></dashboard-administrar>' 
	})
	.when('/create_users',{ 
		template : '<user-register></user-register>' 
	})
	.when('/manager_users',{ 
		template : '<user-manage></user-manage>' 
	})
	.when('/roles',{ 
		template : '<user-roles></user-roles>' 
	})
	.when('/categoria',{ 
		template : '<category></category>' 
	})
	.when('/nivel',{ 
		template : '<level></level>' 
	})
	.when('/tipocurso',{ 
		template : '<type-course></type-course>' 
	})
	.when('/instructor',{ 
		template : '<teacher></teacher>' 
	})
	.when('/cursos',{ 
		template : '<course></course>' 
	})
	.when('/cursos/temario',{ 
		template : '<temary></temary>' 
	})
	.when('/banner',{ 
		template : '<banner></banner>' 
	})
	.when('/nosotros',{ 
		template : '<nosotros></nosotros>' 
	})
	.when('/servicios',{ 
		template : '<servicios></servicios>' 
	})
	.when('/servicios/:servicio_id',{ 
		template : '<servicio-detalle></servicio-detalle>' 
	})
	.when('/usuarios_curso',{ 
		template : '<cursos-clientes></cursos-clientes>' 
	})
	.when('/configuraciones',{ 
		template : '<configuraciones></configuraciones>' 
	})
	.when('/clientes',{ 
		template : '<cliente></cliente>' 
	})
	.when('/contacto',{ 
		template : '<contacto></contacto>' 
	})
	.when('/galeria_imagenes',{ 
		template : '<galeria-fotografica></galeria-fotografica>' 
	})
	.when('/galeria_imagenes/:item',{ 
		template : '<galeria-item></galeria-item>' 
	})
	.otherwise({
		redirectTo:'/home', 
		template : '<not-found></not-found>' 
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
