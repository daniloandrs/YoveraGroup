'use strict';

function Session (storage, memory, location,http) {
    
    let user = storage.get('user'); 
    
    return {    
        isAutenticated: () => {
            if(user) {
                memory.store('user',user)
                let token = memory.get('user').token;
                if (token)
                    http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                let route = '#'+location.url()
                storage.redirect(route);
            } else {
                storage.redirect('login');
            }
                
        },

        authorize : data => {
            storage.set('user',data)
            storage.redirect('../#/home')
        },

        getUser : () => {
            return storage.get('user');
        },

        finalize : () => {
            storage.delete('user');
            storage.redirect('login')
        }
    };
}

Session.$inject = [
    'storage.service','memory.service','$location','$http'
];

angular
    .module('app')
    .service('session.service', Session);