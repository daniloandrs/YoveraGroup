'use strict';

function Run (session,rootScope,anchorScroll) {

   session.isAutenticated();

   rootScope.$on("$locationChangeSuccess", function(){
      anchorScroll();
   });

}

Run.$inject = ['session.service','$rootScope','$anchorScroll'];

angular
    .module('app')
    .run(Run)