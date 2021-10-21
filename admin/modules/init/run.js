'use strict';

function Run (session) {

   session.isAutenticated();

}

Run.$inject = ['session.service']

angular
    .module('app')
    .run(Run)