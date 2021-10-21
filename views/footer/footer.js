'use strict';

let FooterCtrl = (scope,link,swal,toast) => {

	let Configuraciones = async () => {
		let res = await link.get('page/configuraciones');
		scope.configuraciones = res.data.success ? res.data.json : [];
	};


	function initMap() {
		// The location of Uluru
		const uluru = { lat: -5.1715762, lng: -80.6651868 };
		// The map, centered at Uluru
		const map = new google.maps.Map(document.getElementById("map"), {
		  zoom: 17,
		  center: uluru,
		});
		// The marker, positioned at Uluru
		const marker = new google.maps.Marker({
		  position: uluru,
		  map: map,
		});
	  }


	scope.Init = async () => {
		await Configuraciones();
		
		setTimeout(() => {
			initMap();	
		}, 100);
	};	

	scope.object = {};
    
	scope.form;
	
	scope.send = async () => {

        scope.spin = true;

        let res = await link.post('page/send_contact',scope.object);
  
        if(res.data.success) {

            scope.spin = false;

            toast.push({ title: 'Éxito', body : res.data.message , type: 'success' });
            scope.object = {
                nombre : '',
                email : '',
                telefono : '',
                asunto : '',
                mensaje : ''
            };
        }

        scope.$apply();
        
        (scope.form) ? scope.form.$setPristine() : {};

	}
	
}

FooterCtrl.$inject = ['$scope','link.factory','swal.service','toast.service'];

let FooterComponent =  () => {
	return {
		templateUrl:'views/footer/footer.html',
		css:'views/footer/footer.css',
		controller: FooterCtrl
	}
}

angular
	.module('app')
	.component('myFooter',FooterComponent());