'use strict';

let GaleriaImagenesCtrl = ( scope, link, swal, cApp) => {

    scope.tab = 'tab_1';
    scope.path = cApp().storage;

    scope.galerias = [];
    
    let getGaleria = async () => {
        let res = await link.get('page/get_galeria');
        scope.galerias = res.data.success ? res.data.json : [];
        scope.$apply();
    }


    scope.setObject = (object) => {
        let aux = [];
        object.forEach(element => {
          aux.push({
              src: scope.path + element.directorio + '/' + element.url,
              thumb: scope.path + element.directorio + '/' + element.url
          });
        });
        return aux;
    }

    scope.getData = (item) => {
        let tmp = scope.setObject(item.archivos);
        
        setTimeout(() => {
            $(this).lightGallery({
            dynamic: true,
            dynamicEl: tmp
            });
        }, 300);
        
    };

    scope.Init = async () => {
		
        scope.loader = true;
        
        await getGaleria();  

		scope.loader = false;

		scope.$apply();
		
    }

}

GaleriaImagenesCtrl.$inject = ['$scope','link.factory','swal.service','cApp'];

let GaleriaImagenesComponent =  () => {
	return {
        templateUrl: "views/galeria-imagenes/galeria-imagenes.html",
        css:'views/galeria-imagenes/galeria-imagenes.css',
        controller: GaleriaImagenesCtrl
	}
}

angular
	.module('app')
	.component('galeriaImagen' ,GaleriaImagenesComponent());
