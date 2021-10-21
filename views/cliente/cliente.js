'use strict';

let ClienteCtrl = ( scope, link, swal, cApp,toast) => {
    scope.path = cApp().storage;
    scope.object = {};
    scope.path = cApp().storage;
    scope.spin =false;

    scope.form;

    let GetClientes = async () => {	
		let res = await link.get('page/get_clientes');
		scope.clientes = res.data.success ? res.data.json : [];
	}

	scope.Init = async () => {
        scope.loader  = true;

        await GetClientes();
        
        setTimeout(() => {
            $('#owl-clientes-view').owlCarousel({
				center     : false,
				loop       : false,
				margin     : 14,
				nav        : true,
				slideBy    : 5,
				dots       : true,
                autoplayTimeout : 5000,
                autoplay: true,
				navText    : ["",""],
				responsive : {          
					0   :{ items:1, nav:true, loop:false},

					600 :{ items:2, nav:true, loop:false},

					1000:{ items:4, nav:true, loop:false, dots:false}
				}
			});
        }, 100);

        scope.loader  = false;
        scope.$apply();
    };
    
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

ClienteCtrl.$inject = ['$scope','link.factory','swal.service','cApp','toast.service'];

let ClienteComponent =  () => {
	return {
        templateUrl: "views/cliente/cliente.html",
        css:'views/cliente/cliente.css',
        controller: ClienteCtrl
	}
}

angular
	.module('app')
	.component('cliente' ,ClienteComponent());
