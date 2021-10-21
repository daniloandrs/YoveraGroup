'use strict';

let FooterCtrl = (scope) => {
	
}

FooterCtrl.$inject = ['$scope'];

let FooterComponent =  () => {
	return {
		templateUrl: "modules/app/components/footer/footer.html",
		css:'modules/app/components/footer/footer.css',
        controller: FooterCtrl
	}
}

angular
	.module('app')
	.component('myFooter', FooterComponent());