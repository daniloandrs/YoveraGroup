'use strict';

let HomeCtrl = ( scope, link, swal) => {

	scope.forms = {}
	scope.object = {};
	
}

HomeCtrl.$inject = ['$scope','link.factory','swal.service'];

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
