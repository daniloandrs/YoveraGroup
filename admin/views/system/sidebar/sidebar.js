'use strict';

let SidebarCtrl = ( scope, link, session ) => {
	
	scope.menu = {}
	scope.user = {}

	scope.selected = -1;
	scope.lastSelected = -1;
	scope.showOption = -1;


	let SessionMenu = () => {
		let data	= session.getUser();
		scope.menu 	= data.menu;
		scope.user 	= data.user;
	}


	scope.select= index => {
		scope.selected = index; 
	};

	scope.expanded = index => {
		if (scope.lastSelected != -1) {
			if (scope.lastSelected != index) {
				scope.selected = -1;
				$('#collapse_'+scope.lastSelected).removeClass( "show")
			}
				
		}
		scope.lastSelected = index;
	}

	SessionMenu();
}



SidebarCtrl.$inject = ['$scope','link.factory','session.service'];

let SidebarComponent =  () => {
	return {
		templateUrl: "views/system/sidebar/sidebar.html",
		css:'views/system/sidebar/sidebar.css',
        controller: SidebarCtrl
	}
}

angular
	.module('app')
	.component('sidebar',SidebarComponent());