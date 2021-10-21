'use strict';

let LinkFactory = (cApp, http,storage) => {
	
	let prefix = cApp().prefix

	// post - get - put - delete 
	let get 	= route => http.get(prefix + route);
	
	let post 	= (route,object) => http.post(prefix + route ,object);

	let put 	= (route,object) =>  http.put(prefix + route, object);

	let deletes  = (route,object) =>  http.delete(prefix + route,object);

	return {
		// api 
		get 	: route => get(route),

		post 	: (route,object) => post(route,object),

		deletes : (route) =>  http.delete(prefix + route),

		// crud

		get_crud   : (model_name,relations = null) => {
			return post('crud/getdata',{model:model_name,relations : relations});
		},

		show_crud   : (model_name,id) => {
			return post('crud/showdata',{model:model_name,id:id});
		},
		
		create_crud: (model_name,object) => {
			object.model = model_name;
			return post('crud/create',object);
		},

		update_crud: (model_name,object) =>  {
			object.model = model_name; 
			return put('crud/update',object);
		},

		delete_crud: (model_name,object) => {
			object.model = model_name; 
			return post('crud/delete',object);
		},	

		routeDropzone : (route) => {
			let server = prefix;
            return  `${server}${route}`;
        },
		
		formData : (route_name, data) => {

			let formData = new FormData();
			
			angular.forEach(data, (value, key) => {
			
				if (key === 'archivo' && angular.isArray(value)) {
			
					angular.forEach(value, (image, index) => {
			
						formData.append('archivo_' + (index + 1), image);
			
					});
			
					formData.append('nFiles', value.length);
			
				} else {
			
					formData.append(key, value)
			
				}
			
			});

            let response = http.post(prefix + route_name, formData, {
			   
				headers: {
                    "Content-type": undefined,
                },
				
				transformRequest: angular.identity
			});
			
            return response;
		},
		// logout
		logout : () => post('auth/logout'),
	}

}

LinkFactory.$inject = ['cApp','$http','storage.service']

angular
	.module('app')
	.factory('link.factory',LinkFactory)
