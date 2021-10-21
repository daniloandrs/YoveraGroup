'use strict';

let LinkFactory = (cApp, http,storage) => {
	
	let prefix = cApp().prefix

	// post - get - put - delete 
	let get 	= route => http.get(prefix + route);
	
	let post 	= (route,object) => http.post(prefix + route ,object);

	let put 	= (route,object) =>  http.put(prefix + route, object);

	let deletes = (route,object) =>  http.delete(prefix + route, object);

	return {
		// api 
		get 	   : route => get(route),

		post 	   : (route,object) => post(route,object),


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


		download :  (route, data, typeFile, nombre) => {

			let user = storage.get('user'); 

            let promise = new Promise((resolver, reject) => {
                   
                let response = http({
                    
                    url: prefix + route,
                    method: 'POST',
                    data: data,  
                    body: data, 
                    headers: {
						'Content-type': 'application/json'
					},
					
                    responseType: 'blob'
                });
                response.then(res => {
                    var data = res.data;
                    if (data.type !== 'application/json') {
                        var file = new Blob([data], {
                            type: typeFile
                        });
                        var fileURL = URL.createObjectURL(file);
                        var a = document.createElement('a');
                        a.href = fileURL;
                        a.target = '_blank';
                        a.download = (nombre || 'archivo') + typeFile;
                        var content_disposition = res.headers()['content-disposition'];
                        if (content_disposition && content_disposition.split('"').length >= 2)
                            a.download = content_disposition.split('"')[1];
                        else if (content_disposition && content_disposition.split('=').length > 1)
                            a.download = content_disposition.split('=')[1];
                        document.body.appendChild(a);
                        a.click();
                        resolver(response);
                    } else if ("TextDecoder" in window) {
                        var reader = new FileReader();
                        reader.addEventListener("loadend", function () {
                            var enc = new TextDecoder("utf-8");
                            let json = JSON.parse(enc.decode(reader.result));
                            resolver(json);
                        });
                        reader.readAsArrayBuffer(data);
                    }
                });
            });
            return promise;
		}
		,
		// logout
		logout : () => post('auth/logout'),
	}

}

LinkFactory.$inject = ['cApp','$http','storage.service']

angular
	.module('app')
	.factory('link.factory',LinkFactory)
