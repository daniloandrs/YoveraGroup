
'use strict';

let LoaderComponent =  () => {
	return {
		templateUrl: 'modules/app/components/loader/loader.html',
		css:'modules/app/components/loader/loader.css',
		controller: function () {
			this.default_type = 'loading';
		},
		bindings: {
			type:'@'
		}
	}
}

angular
	.module('app')
	.component('loader', LoaderComponent());