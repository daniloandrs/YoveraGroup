'use strict';

const CursosViewCtrl = (scope, link) => {

	
	let GetCursos = async () => {	
		let res = await link.get('page/get_cursos');
		scope.listCursos = res.data.success ? res.data.json : [];
	}

	scope.Init = async () => {
		scope.loader = true;
		await GetCursos();
		scope.loader = false;
		scope.$apply();
	};

}

CursosViewCtrl.$inject = ['$scope','link.factory','swal.service'];

const CursosViewComponent =  () => {
	return {
		templateUrl:'views/cursos/cursos.html',
		css:'views/cursos/cursos.css',
		controller: CursosViewCtrl
	}
}

angular
	.module('app')
	.component('cursos',CursosViewComponent());