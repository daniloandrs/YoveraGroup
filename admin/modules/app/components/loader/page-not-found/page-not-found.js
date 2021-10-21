'use strict';

let NotFoundCtrl = (scope) => {
	
}

NotFoundCtrl.$inject = ['$scope'];

let NotFoundComponent =  () => {
	return {
		templateUrl: "modules/app/components/page-not-found/page-not-found.html",
		css:'modules/app/components/page-not-found/page-not-found.css',
        controller: NotFoundCtrl
	}
}

angular
	.module('app')
	.component('notFound', NotFoundComponent());