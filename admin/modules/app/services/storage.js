'use strict';

function StorageService () {
	return {
		set :(name, data) => 
		{ 
			localStorage.setItem(name,window.btoa(JSON.stringify(data)))
		},
		
		get :(name) => 
		{
			let data = localStorage.getItem(name)
			return (data === null) ? undefined : angular.fromJson(window.atob(data))
		},

		delete :(name) => 
		{
			localStorage.removeItem(name)
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