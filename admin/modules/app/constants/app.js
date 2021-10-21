let ConstantsApp = () => {
	
	return {
		prefix 	: './api_rest/public/api/',
		storage : './api_rest/storage/app/'
	}
}

let ConstantsFirebase = () => {
	//let firebase_api = storage.get('user').firebase;
	return {
		/*
		apiKey: firebase_api.api_key,
      	authDomain: firebase_api.auth_domain,
		databaseURL: firebase_api.database_url,
		//projectId: "beneficencia-db2f8",
		storageBucket: firebase_api.storage_bucket,
		//messagingSenderId: "138368049916"
		*/
		apiKey : 'AIzaSyA38HKqkIOqgFO2gjWFjVJzvNWo-SNjJzI',
        authDomain : 'api-notifications-7f6eb.firebaseapp.com',
        databaseURL : 'https://api-notifications-7f6eb.firebaseio.com',
        storageBucket : '',
	}
}
//ConfigFirebase.$inject = ['storage.service'];

angular
	.module('app')
	.constant('cApp', ConstantsApp)
	.constant('cFirebase',ConstantsFirebase)