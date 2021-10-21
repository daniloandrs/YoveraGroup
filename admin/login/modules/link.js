'use strict';
let ConstantsApp = () => {
	
	return {
		prefix 		: '../api_rest/public/api/autenticate',
		storage 	: '../api_rest/storage/app/public/'
	}
}

angular
	.module('login')
    .constant('cApp', ConstantsApp)
    
let LinkFactory = (cApp, http ) => {
	
	let prefix = cApp().prefix
	return {
		login : (credenciales) => { 
			return  http.post(prefix,credenciales)
		}
	}
}


LinkFactory.$inject = ['cApp','$http']

angular
	.module('login')
	.factory('link.factory', LinkFactory)
