'use strict';

function StorageService () {
	return {
		set :(name, data) => 
		{ 
			localStorage.setItem(btoa(name), btoa(JSON.stringify(data)));
		},
		
		get :(name) => 
		{	
			let data = localStorage.getItem(btoa(name));
    		return (data === null) ? undefined : JSON.parse(atob(data))
		},

		delete :(name) => 
		{
			localStorage.removeItem(btoa(name));
		},

		clear :() => {
			localStorage.clear()
		},

		redirect :(url) => {
			window.location = url
		}
	}
}


StorageService.$inject = [];

angular
	.module('app')
	.service('storage.service', StorageService)