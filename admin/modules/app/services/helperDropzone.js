
(function(){
	'use strict';

	angular.module('dropzone',[])
	.directive('dropzone', function () {
        return function (scope, element, attrs) {
			var config, dropzone;
            config = scope[attrs.dropzone];
            dropzone = new Dropzone(element[0], config.options);
            angular.forEach(config.eventHandlers, function (handler, event) {
              dropzone.on(event, handler);
            });
        };
    })
	.factory('helperDropzone',helperDropzone);

	function helperDropzone()
	{
		var dropzone = {};
		return{
			configDropzone: function(dropzone_id,route,nameFile,token,type = 'image/*',multiple = true) {
				let maxFiles = 30;
			 	dropzone = new Dropzone(`div#${dropzone_id}`, { 		
					addRemoveLinks: true,
					url: route,
		            paramName: nameFile, 
		            maxFilesize: 3000, // MB
		            maxFiles: multiple ? maxFiles : 1,  //numero de archivos permitidos
		            acceptedFiles: type,
		            // autoQueue: false,
		            autoProcessQueue : false,
		            dictDefaultMessage : "Click aquí, para cargar archivo",
		            dictRemoveFile : type === 'image/*' ?  'Eliminar Imagen' : type == '.mp4,.mkv,.avi' ?  'eliminar video' : 'Eliminar archivo',
		            dictMaxFilesExceeded : `Sólo se permiten ${maxFiles}  archivos como máximo`,
		            dictCancelUpload : "Cancelar subida", 
		            // thumbnailWidth: 90,
					// thumbnailHeight: 90,
					//previewTemplate: template_preview,
		            parallelUploads: 1000,
					uploadMultiple: multiple ? true : false,
					headers:{"Authorization":'Bearer ' + token},
		            init: function () {
				        this.on("addedfile", function (file) {

							if (type === 'video') {
								var ext = file.type;
								var newimage = "";
								if(ext != 'png' && ext != 'jpg' && ext != 'jpeg'){
								newimage = './dist/images/video-preview.jpg';
								}
							  
								this.createThumbnailFromUrl(file, newimage);
							} else {
								var img = $(file.previewTemplate).find("img");
								img[0].onload = function () {
									var max = this.width > this.height ? this.width : this.height;
									var ratio = 100.0 / max;

									var width = (this.width * ratio)+20;
									var height = (this.height * ratio)+20;

									img.attr("d-lightbox-open",'');
			
									img.css({  
										width: width + "px",
										height: height + "px",
										top: ((150 - height) / 2) + "px",
										left: ((150 - width) / 2) + "px"
									});
								};
							}
				        });
				    }  

	        	}); 
	        	return dropzone;
			},

		};

	}
})();