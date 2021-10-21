'use strict';

let IndexCtrl = (scope,timeout,link) => {
	
	var cont = 0;
	var iterator = 2; // ¿Cúantos segundos?

	let restart = (success) => {
		cont = 0;
        scope.loader = (success) ? true : false;
	}

    let cargarLoader =  () => {
		restart(true);
        load();
    };

    let load = () => {
        if(cont < iterator )
        	timeout(() => { cont++; load();},1000);
        else
		  restart(false);
	};

	scope.setMessageWhatsapp = () => {
        return `Hola necesito información sobre uno de sus servicios en el sitio web www.yoveragroup.com`;
    };

    scope.adquirirServicio = () => {
        let encode =  `https://wa.me/${scope.number}?text=${encodeURI(scope.setMessageWhatsapp())}`;
        window.open(encode,'_blank');
	}
	
	let Configuraciones = async () => {
		let res = await link.get('page/configuraciones');
		scope.configuraciones = res.data.success ? res.data.json : {};
		scope.number = scope.configuraciones.telefono_whatsapp;
		scope.$apply();
	}; 

	cargarLoader();
  
	Configuraciones();

}

IndexCtrl.$inject = ['$scope','$timeout','link.factory'];


angular
	.module('app')
	.controller('index', IndexCtrl);