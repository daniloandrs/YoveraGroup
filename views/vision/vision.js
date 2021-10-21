'use strict';

let VisionCtrl = ( scope, link, swal, cApp) => {

    scope.tab = 'tab_1';
    scope.path = cApp().storage;

    scope.nosotros = {};
    
    let getInfoNosotros = async () => {
        let res = await link.get('nosotros/info');
        scope.nosotros = res.data.success ? res.data.json : {};
        scope.$apply();
        
    }

    scope.changeTab = (tab) => scope.tab = tab;

    scope.Init = async () => {
		
		scope.loader = true;

        scope.changeTab('tab_1');

        await getInfoNosotros();

		scope.loader = false;

		scope.$apply();
		
    }

}

VisionCtrl.$inject = ['$scope','link.factory','swal.service','cApp'];

let VisionComponent =  () => {
	return {
        templateUrl: "views/vision/vision.html",
        css:'views/vision/vision.css',
        controller: VisionCtrl
	}
}

angular
	.module('app')
	.component('vision' ,VisionComponent());
