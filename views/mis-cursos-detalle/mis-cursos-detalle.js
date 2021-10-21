'use strict';

const MisCursosDetalleCtrl = (scope, link,swal,storage,http,routeParams,cApp) => {

	scope.urlCurso = routeParams.url_curso;

	scope.detalleClase ={};

	var player;

	scope.path = cApp().storage;

	let getFirstClase = (temarioList) => {
		return temarioList.find(i=>i.numeration==1).temary_courses.find(u=>u.numeration==1);
	};


	scope.openVideo = async (row) => {

		scope.loaderVideo = true;
		await scope.getClase(row.id);
		scope.loaderVideo = false;
		scope.$apply();
		player.src({
			type: 'video/mp4',
			src: `${scope.path}${scope.claseDetalle.url_video}`
		});
		player.play();
	}

	scope.getClase = async (clase_id) => {
		let res = await link.get(`page/get_clase/${clase_id}`);
		scope.claseDetalle = res.data.success ? res.data.json : {};
	};

	let GetDetalleCurso = async () => {
        let res = await link.get(`page/mi_detalle_curso/${scope.urlCurso}`);
		if(res.data.success) {
			scope.detalleCurso = res.data.json;
			let clase = getFirstClase(scope.detalleCurso.temario);
			await scope.getClase(clase.id);
			scope.$apply();
		} else {
			swal.error(res.data.message);
			return 	storage.redirect('#/login');
		}
	}


	scope.toggleAccordion = (temary,id) => {
		temary.collapsed = !temary.collapsed;
		scope.detalleCurso.temario.filter(item => item.id != temary.id).forEach(item => item.collapsed = false);
		let accordion = $(`#${id}`);
		accordion.hasClass("show") ? accordion.collapse('hide') : accordion.collapse('show');
	} 


	scope.dowloadFile = (file) => {
		file.spin = true;
		link.download('page/download_file',file,file.tipo_archivo,file.url)
		.then( res => {
			file.spin = false;
			scope.$apply();
		}).catch( error => { 
			file.spin = false;
			scope.$apply();
		});
			
	};
	
	scope.assignIcon = (tipo_archivo) => {
		
		let icon = "fa-2x fas fa-file";
		let icon_file;

		switch (tipo_archivo) {
			case 'docx':
					icon_file = `${icon}-word color-word`;
				break;
			case 'pdf':
				icon_file = `${icon}-pdf color-pdf`;
				break;
				
			case 'xlsx':
			case 'xls':
				icon_file = `${icon}-excel color-excel`;
				break;

			case 'pptx':
			case 'ppt' : 
				icon_file = `${icon}-powerpoint color-ppt `;
				break;
			default :
				icon_file = `${icon}-alt color-file`;
		}
		return icon_file;
	}	


	scope.$on('$destroy', function() { 
		console.log(player);
		player.dispose();
	 });

	scope.Init = async () => {
		scope.loader = true;
		let user = storage.get('user');
		if(user == null) {
			swal.error('No ha iniciado sesión.');
			return 	storage.redirect('#/login');
		} else {
			http.defaults.headers.common['Authorization'] = 'Bearer ' + user.app_token;
			await GetDetalleCurso();
			scope.loader = false;
			scope.$apply();
		}  
		
		setTimeout(() => {
			var options = {
				fluid: true
			};

			//videojs(oldPlayer).dispose();

			player = videojs('my-video', options, function onPlayerReady() {
				this.on('ended', function() {					
					console.log('video ended');
				});

			});
		}, 100);

		scope.loader = false;
		scope.$apply();
	};

}

MisCursosDetalleCtrl.$inject = ['$scope','link.factory',
'swal.service','storage.service','$http','$routeParams','cApp'];

const MisCursosDetalleComponent =  () => {
	return {
		templateUrl:'views/mis-cursos-detalle/mis-cursos-detalle.html',
		css:'views/mis-cursos-detalle/mis-cursos-detalle.css',
		controller: MisCursosDetalleCtrl
	}
}

angular
	.module('app')
	.component('misCursosDetalle',MisCursosDetalleComponent());