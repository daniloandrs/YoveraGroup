'use strict';

let NosotrosCtrl = ( scope, link, swal, cApp) => {

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

		scope.loader =false;

        setTimeout(() => {

			/** imagenes carousel */

			$('#owl-imagenes').owlCarousel({
				center     : false,
				loop       : false,
				margin     : 14,
				nav        : true,
				slideBy    : 5,
				dots       : true,
				autoHeight: true,
				autoplayTimeout : 2000,
				navText    : ['',''],
				responsive : {          
					0   :{ items:1, nav:true, loop:false,dots:true},
					600 :{ items:1, nav:true, loop:false,dots:true},
					1000:{ items:1, nav:true, loop:false,dots:true}
				}
			});
 
		}, 100);  

		scope.$apply();
		
    }

}

NosotrosCtrl.$inject = ['$scope','link.factory','swal.service','cApp'];

let NosotrosComponent =  () => {
	return {
        templateUrl: "views/nosotros/nosotros.html",
        css:'views/nosotros/nosotros.css',
        controller: NosotrosCtrl
	}
}

angular
	.module('app')
	.component('nosotros' ,NosotrosComponent());
