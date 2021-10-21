'use strict';

let CursoDetalleController = (scope,cApp,routeParams,link) => {

    scope.CONFIG = {
        STORAGE : cApp().storage
    }

    scope.urlCurso = routeParams.url_curso;
    scope.detalleCurso = {};

    let getDetalleCurso = async () => {
        let res = await link.get(`page/get_detalle_curso/${scope.urlCurso}`);
        scope.detalleCurso = res.data.success ? res.data.json : null;
    }

    scope.CONFIG = {
        STORAGE : cApp().storage  
    };

    scope.setMessageWhatsapp = () => {
        return `Hola estoy interesado en adquirir el curso de : ${scope.detalleCurso.name} , en el sitio web www.yoveragroup.com.`;
    };

    scope.adquirirCurso = () => {
        let encode =  `https://wa.me/${scope.number}?text=${encodeURI(scope.setMessageWhatsapp())}`;
        window.open(encode,'_blank');
    }
    
    let getServicios = async () => {
		let res = await link.get('page/get_servicios');
		scope.servicios = res.data.success ? res.data.json : [];
	}
    
    
    scope.toggleAccordion = (temary,id) => {
		temary.collapsed = !temary.collapsed;
		scope.detalleCurso.temario.filter(item => item.id != temary.id).forEach(item => item.collapsed = false);
		let accordion = $(`#${id}`);
		accordion.hasClass("show") ? accordion.collapse('hide') : accordion.collapse('show');
    } 
    
    let Configuraciones = async () => {
		let res = await link.get('page/configuraciones');
        scope.configuraciones = res.data.success ? res.data.json : [];
        scope.number = scope.configuraciones.telefono_whatsapp;
    };

    let GetCursos = async () => {	
		let res = await link.get('page/get_cursos_top');
		scope.listCursos = res.data.success ? res.data.json : [];
	}  
    
	scope.Init = async () => {
        scope.loader = true;
        await getDetalleCurso();
        await Configuraciones();
        await getServicios();  
        await GetCursos();
        scope.loader = false;
        scope.$apply();
    }

}

CursoDetalleController.$inject = ['$scope','cApp','$routeParams','link.factory'];

let CursoDetalleView =  () => {
	return {
        templateUrl: "./views/curso-detalle/curso-detalle.html",
        css:'./views/curso-detalle/curso-detalle.css',
        controller: CursoDetalleController,
        bindings: {
            curso: '='
        }
	}
}

angular
	.module('app')
	.component('cursoDetalleView' ,CursoDetalleView());
