let ConstantsApp = () => {
	
	return {
		prefix 	: './admin/api_rest/public/api/',
		storage : './admin/api_rest/storage/app/'
	}
}  

let ConstantsFirebase = () => {

	return {

		apiKey : 'AIzaSyA38HKqkIOqgFO2gjWFjVJzvNWo-SNjJzI',
        authDomain : 'api-notifications-7f6eb.firebaseapp.com',
        databaseURL : 'https://api-notifications-7f6eb.firebaseio.com',
        storageBucket : '',
	}
}

angular
	.module('app')
	.constant('cApp', ConstantsApp)
	.constant('cFirebase',ConstantsFirebase)