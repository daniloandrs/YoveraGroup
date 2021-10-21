'use strict';

const MisCursosCtrl = (scope, link,swal,storage,http) => {

	let GetMisCursos = async () => {	
		let res = await link.get('page/misCursos');
		if(res.data.success) {
			scope.listCursos = res.data.json;
		} else {
			swal.error(res.data.message);
			return 	storage.redirect('#/login');
		}
	}

	scope.Init = async () => {
		scope.loader = true;
		let user = storage.get('user');
		console.log(user);
		if(user == null) {
			swal.error('No ha iniciado sesión.');
			return 	storage.redirect('#/login');
		} else {
			http.defaults.headers.common['Authorization'] = 'Bearer ' + user.app_token;
			await GetMisCursos();
		}

		scope.loader = false;
		scope.$apply();
	};

}

MisCursosCtrl.$inject = ['$scope','link.factory','swal.service','storage.service','$http'];

const MisCursosComponent =  () => {
	return {
		templateUrl:'views/mis-cursos/mis-cursos.html',
		css:'views/mis-cursos/mis-cursos.css',
		controller: MisCursosCtrl
	}
}

angular
	.module('app')
	.component('misCursos',MisCursosComponent());