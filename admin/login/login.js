'use strict';

let LoginCtrl = (scope, session, link,swal) => {
    
    scope.credenciales = {}

    scope.spin = false;
    
    let accept = res => {
        res.data.access ? session.authorize(res.data.info) : swal.error(res.data.message);
        scope.spin = false;
    }

    scope.login = credenciales => {
        scope.spin = true;
        link.login(credenciales)
        .then( res => accept(res) )
        .catch( errors => swal.error(errors) )
    }
 
}

LoginCtrl.$inject = ['$scope','session.service','link.factory','swal.service'];

angular
	.module('login')
	.controller('login', LoginCtrl);
