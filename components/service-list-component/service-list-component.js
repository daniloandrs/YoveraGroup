'use strict';

let ServiceListController = (scope,cApp) => {

    scope.CONFIG = {
        STORAGE : cApp().storage
    }

	scope.Init = () => {}

}

ServiceListController.$inject = ['$scope','cApp'];

let ServiceListComponent =  () => {
	return {
        templateUrl: "./components/service-list-component/service-list-component.html",
        css:'./components/service-list-component/service-list-component.css',
        controller: ServiceListController,
        bindings: {
            subServicios: '='
        }
	}
}

angular
	.module('app')
	.component('serviceListComponent' ,ServiceListComponent());
