'use strict';

let IndexCtrl = (scope,timeout) => {
	
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
	
	cargarLoader();
}

IndexCtrl.$inject = ['$scope','$timeout'];


angular
	.module('app')
	.controller('index', IndexCtrl);