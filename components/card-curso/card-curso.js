'use strict';

let CardCursoController = (scope,cApp) => {

    scope.CONFIG = {
        STORAGE : cApp().storage
    }

	scope.Init = () => {
        scope.loggedIn = false;
    }

}

CardCursoController.$inject = ['$scope','cApp'];

let CardCursoComponent =  () => {
	return {
        templateUrl: "./components/card-curso/card-curso.html",
        css:'./components/card-curso/card-curso.css',
        controller: CardCursoController,
        bindings: {
            curso: '=',
            loggedIn : '=' 
        }
	}
}

angular
	.module('app')
	.component('cardCursoComponent' ,CardCursoComponent());
