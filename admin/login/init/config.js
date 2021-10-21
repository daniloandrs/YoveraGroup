'use strict';
angular
    .module('login',[

    ])

function Run (session) {
    session.isAutenticated();
}

Run.$inject = ['session.service']

angular
    .module('login') 
    .run(Run)