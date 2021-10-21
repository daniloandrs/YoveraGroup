'use strict';

let NavbarCtrl = ( scope, link,session,swal,rootScope,location,storage,http,window,cApp) => {
	
	scope.user = {}

	scope.showFondo = true;

	scope.path = cApp().storage;

	scope.currentRoute = location.path();

	scope.hideLogo = true;
	$(window).on("scroll", function () {
		if ($(this).scrollTop() > 333) {}
	});
	

	let SessionUser = () => {}

	let getServicios = async () => {
		let res = await link.get('page/get_servicios');
		scope.servicios = res.data.success ? res.data.json : [];
	} 

	let getTipoCursos = async () => {
		let res = await link.get('page/get_tipo_cursos');
		scope.tipo_cursos = res.data.success ? res.data.json : [];
	}   

	scope.logout = () => swal.confirm('¿ Seguro que desea cerrar sesión ?',finalizeSession);

	let finalizeSession = () => {   
		
		storage.delete('user');
		storage.delete('token');
		http.defaults.headers.common['Authorization'] = 'Bearer ' + 'not-aut';
		window.location.reload();

	}

	rootScope.$on("$locationChangeStart", function() {
		scope.currentRoute = location.path();
	});
	

	scope.closeMenu = () => {
		$('.mobile-menu-toggle').toggleClass("active");
		$('.mobile-menu-toggle').find("i").toggleClass("icon-x");
		$('.mobile-menu').toggleClass("open");
	}

	scope.getJqueryNavbar  = () => {

		(function (b, c) {
			$(b).on("click", function () {
				$(this).toggleClass("active"), $(this).find("i").toggleClass("icon-x"), $(c).toggleClass("open");
			});
		  })(".mobile-menu-toggle", ".mobile-menu");
				
		  $(".slideable-menu .slideable-submenu").each(function () {
			  $(this).prepend('<li class="back-btn"><a href="#">Regresar</a></li>');
		  });
	  
		  var d = $(".has-children .sub-menu-toggle");
		  $(".slideable-menu .slideable-submenu .back-btn").on("click", function (b) {
			  var c = this,
				  d = $(c).parent(),
				  e = $('#menu_mobile_slideable'),
				  f = $(c).parents(".menu"),
				  g = $(".slideable-menu .menu").attr("data-initial-height");
			  d.removeClass("in-view");
			  e.removeClass("off-view"), "menu" === e.attr("class") ? f.css("height", g) : f.css("height", e.height()), 
			  b.preventDefault();
		  })
		  
		  d.on("click", function (b) {
			
			var c = this,
				d = $(c).parent().parent().parent(),
				e = $(c).parents(".menu");
			return d.addClass("off-view"), $(c).parent().parent().find("> .slideable-submenu").addClass("in-view"), e.css("height", $(c).parent().parent().find("> .slideable-submenu").height()), b.preventDefault(), !1;
		  }),
		  (function (b, c, d) {
			  $(b).on("click", function () {
				  $(this).addClass("sidebar-open"), $(c).addClass("open");
			  }),
				  $(d).on("click", function () {
					  $(b).removeClass("sidebar-open"), $(c).removeClass("open");
				  });
		  })(".sidebar-toggle", ".sidebar-offcanvas", ".sidebar-close");  
	}


	let getInfoNosotros = async () => {
        let res = await link.get('nosotros/info');
		scope.nosotros = res.data.success ? res.data.json : {};
		scope.imagen_logo  = scope.nosotros?.logo;
        scope.$apply();    
	}
	
	let Configuraciones = async () => {
		let res = await link.get('page/configuraciones');
		scope.configuraciones = res.data.success ? res.data.json : {};
	}; 

	let isAutenticado = () => {
		let user = storage.get('user');
		scope.token = storage.get('token');
		if(user == null) {
			scope.user  = {};
			scope.user.loggedIn = false;
			http.defaults.headers.common['Authorization'] = 'Bearer ' + scope.token;
		} else {
			scope.user  = user;
			scope.user.loggedIn = true;
			http.defaults.headers.common['Authorization'] = 'Bearer ' + scope.token;
		}

	};  

	scope.Init = async () => {
		scope.getJqueryNavbar();
		SessionUser();
		await getInfoNosotros();
		await getServicios();
		await Configuraciones();
		await getTipoCursos();
		isAutenticado();
		scope.$apply();

	}
}



NavbarCtrl.$inject = ['$scope',
'link.factory',
'session.service',
'swal.service',
'$rootScope',
'$location',
'storage.service',
'$http',
'$window',
'cApp'
];

let NavbarComponent =  () => {
	return {
		templateUrl: "views/system/navbar/navbar.html",
		css: 'views/system/navbar/navbar.css',
        controller: NavbarCtrl
	}
}

angular
	.module('app')
	.component('navbar',NavbarComponent()) ;