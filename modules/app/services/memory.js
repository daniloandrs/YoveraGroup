'use strict'


function Memory () {

	let mem = [];

	return {

        store: (name, value) => {
            	mem[name] = value;
		},
		
        get: name => {
            return mem[name]
        }
    }
}


Memory.$inject = [];

angular
    .module('app')
    .service('memory.service', Memory);