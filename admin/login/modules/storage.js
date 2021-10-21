'use strict';

function StorageService () {
	
	this.set = (name, data) => 
	{ 
		localStorage.setItem(name,window.btoa(JSON.stringify(data)))
	}
	
	this.get = (name) => 
	{
		let data = localStorage.getItem(name)
		return (data === null) ? undefined : angular.fromJson(window.atob(data))
	}

	this.delete = (name) => 
	{
		localStorage.removeItem(name)
	}

	this.clear = () => {
		localStorage.clear()
	}

	this.redirect = (url) => {
		window.location = url
	}
}


StorageService.$inject = [];

angular
	.module('login')
	.service('storage.service', StorageService)