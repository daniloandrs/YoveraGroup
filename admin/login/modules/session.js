'use strict';

function Session (storage) {
    let user    = storage.get('user');
    return {
        isAutenticated: () => {
            if(user)
                storage.redirect('../#/home');
        },

        authorize : (data) => {
            storage.set('user',data)
            storage.redirect('../#/home')
        }
    };
}

Session.$inject = [
    'storage.service'
];

angular
    .module('login')
    .service('session.service', Session);