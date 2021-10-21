'use strict';

let NavbarCtrl = ( scope, link,session,w ,swal) => {
	
	scope.user = {} 

	scope.toggleSidebar = () => {
		let tamanio = tamVentana();
		let sidebar = document.getElementById('sidebar-toggle');
		let main 	= document.getElementById('main');
		let size = (sidebar.style.width == '0em' ) ? '18em' : '0em';
		main.style.marginLeft = (tamanio[0] > 991) ? size : '0em';
		sidebar.style.width = size;	
	};

	let SessionUser = () => {
		let user  	= session.getUser();
		scope.user 	= user.user;
	}

	scope.logout = () => swal.confirm('¿ Seguro que desea cerrar sesión ?',scope.finalizeSession);

	scope.finalizeSession = () => {
		link.logout().then (res => {
			res.data.success ? session.finalize() : swal.error('Ha ocurrrido un error al intentar cerrar sesión.');
		})
		.catch( errors => {
			console.log(errors)
		});
	}
 	
	function tamVentana() {
		var tam = [0, 0];
		if (typeof w.innerWidth != 'undefined')
		{
			tam = [w.innerWidth,w.innerHeight];
		}
		else 
			if (typeof document.documentElement != 'undefined'
			&& typeof document.documentElement.clientWidth !=
			'undefined' && document.documentElement.clientWidth != 0)
			{
				tam = [
					document.documentElement.clientWidth,
					document.documentElement.clientHeight
				];
			}
			else   {
				tam = [
					document.getElementsByTagName('body')[0].clientWidth,
					document.getElementsByTagName('body')[0].clientHeight
				];
			}
		return tam;
	}
	  
	//init 
	SessionUser();
}



NavbarCtrl.$inject = ['$scope','link.factory','session.service','$window','swal.service'];

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