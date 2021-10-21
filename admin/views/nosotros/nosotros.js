'use strict';

let NosotrosCtrl = ( scope, link, swal,cApp) => {

    scope.tab = 'tab_1';
    scope.titulo = null;
    scope.path = cApp().storage;

    scope.clearDefault = {};
    scope.clearDefaultFondo = {};

    scope.optionsFileFondo = {
        multiple : false,
		type : 'image',
		dimentions : {
			size : 1000000,
			height : 1000000,
			width : 10000000
		}
    }

    scope.optionsFile =  {  
		multiple : false,
		type : 'image',
		dimentions : {
			size : 1000000,
			height : 1000000,
			width : 10000000
		}
    }

    scope.optionsFileLogo =  {  
		multiple : false,
		type : 'image',
		dimentions : {
			size : 1000000,
			height : 1000000,
			width : 10000000
		}
    }
    
    scope.object = {};
    scope.objectFondo = {};
    scope.objectLogo = {};
    
    scope.imagenes = [];

    scope.nosotros = {
        id : null,
        descripcion : '',
        mision : '',
        vision : ''
    };

    var quill;

    var toolbarOptions = [

        ['bold', 'italic', 'underline', 'strike'],

        ['blockquote', 'code-block'],

        [{'header': 1}, { 'header': 2}],

        [{'list': 'ordered'}, {'list': 'bullet'}],

        [{ 'script': 'sub'}, {'script': 'super'}],
        
        [{'indent': '-1'}, {'indent': '+1'}],
        
        [{ 'direction': 'rtl'}],

        [{ 'size': ['small', false, 'large', 'huge'] }], 

        [{
            'header': [1, 2, 3, 4, 5, 6, false]
        }],

        ['link', 'image', 'video', 'formula'],

        [{
            'color': []
        }, {
            'background': []
        }],
        [{
            'font': []
        }],
        [{ 'align': 'left'}, { 'align': 'center'}, {'align': 'right'}],

        ['clean']
    ];

    let getInfoNosotros = async () => {

        let res = await link.get('nosotros/info');
        scope.nosotros = res.data.success ? res.data.json : {};
        scope.imagenes = scope.nosotros?.archivos;
        scope.imagen_fondo = scope.nosotros?.banner;
        scope.imagen_logo  = scope.nosotros?.logo;
        scope.$apply();
    }

    scope.editContent = (option) => {
        
        var content;
        
        scope.titulo = scope.nosotros.titulo;

        switch (option) {

            case 'nosotros':
                content = scope.nosotros.descripcion;
                break;
        
            case 'mision':
                content = scope.nosotros.mision;
                break;

            case 'vision':
                content = scope.nosotros.vision;
                break;

        } 

        scope.setDataEditor(content);
    }

    scope.setDataEditor = (content) => {
        quill.root.innerHTML = content; 
        swal.openModal('modal-editor');
    }


    scope.save = async (titulo) => {

        scope.spinFrom = true;

        if (scope.tab == 'tab_1')
            scope.nosotros.descripcion  = quill.root.innerHTML;
        if (scope.tab == 'tab_2')
            scope.nosotros.mision       = quill.root.innerHTML;
        if (scope.tab == 'tab_3')
            scope.nosotros.vision       = quill.root.innerHTML;
        
        if (scope.nosotros.id == null)
            scope.nosotros.create = true;
        
        scope.nosotros.titulo = titulo;

        let res = await link.post('nosotros/save',scope.nosotros); 

        PostTransaction(res);
    }

    scope.changeTab = (tab) => scope.tab = tab;
    

    /** Galeria */
        
    scope.openModalGaleria = () => {

        scope.editFile = false;

        scope.clearDefault = {
            file : Date.now(),
            isDeleted : true
        }

        scope.default_image = 'undefined.png';

        scope.object = {
            image : undefined
        };

        swal.openModal('modal-galeria');
    }  

    let PostTransaction = res => {
        if (res.data.success) {
            getInfoNosotros();
            swal.closeModal('modal-editor');
            swal.success(res.data.message);
            scope.spinFrom = false;
            scope.loading = false;
        } else {
            if (res.data.errors) scope.errors = res.data.errors;
            if (res.data.message) swal.error(res.data.message);
            scope.spinFrom = false;
        }
    };

    scope.sendDataEvent = async () => {

        scope.clear_default_view = false;

        scope.spinFormImage = true;        
        scope.object.id = scope.nosotros.id;

        let res = !scope.editFile 
            ? await link.formData('nosotros/add_image',scope.object) 
            : await link.formData('nosotros/edit_image',scope.object);
         
        if (res.data.success) {
            
            scope.spinFormImage = false;
            scope.object = {};
            swal.closeModal('modal-galeria');

            await getInfoNosotros();
        }
    }
    
    let deleteTransaction = async () => {

		let res = await link.deletes('nosotros/delete/'+ scope.delete_image.id);

        if(res.data.success) {
            await getInfoNosotros();
        } else {
            swal.error(res.data.message);
        }

		scope.$apply();
    }

     scope.deleteImage = (image) => {

        scope.delete_image = image;

        swal.confirm('¿Seguro que desea eliminar esta imagen?',deleteTransaction);
    }

    scope.editImage = (image) => {
        
        scope.editFile = true;

        scope.object = {
            image : undefined
        };

        scope.object.file_id = image.id;

        scope.clearDefault = {
            file : Date.now(),
            isDeleted : false
        }
        scope.default_image = scope.path + image.directorio + '/' + image.url;

        swal.openModal('modal-galeria');
    }


    scope.saveLogo = async () => {
        scope.spinFormLogo = true;
        scope.objectLogo.id = scope.nosotros.id;
        let res = await link.formData('nosotros/update_logo',scope.objectLogo);
        if(res.data.success) {
            await getInfoNosotros();
            scope.objectLogo = {};
            scope.spinFormLogo = false;
            swal.success(res.data.message);
            scope.$apply();
            
        }
    }

    scope.saveFondo = async () => {     
        scope.spinFormFondo = true;
        scope.objectFondo.id = scope.nosotros.id;
        let res = await link.formData('nosotros/update_banner',scope.objectFondo);
        if(res.data.success) {
            await getInfoNosotros();
            scope.objectFondo = {};
            scope.spinFormFondo = false;
            swal.success(res.data.message);
            scope.$apply();
        }
    }


    scope.Init = async () => {
        
        scope.changeTab('tab_1');
        
        setTimeout(() => { 
            
            /** editor */

            quill = new Quill('#editor', {
                theme: 'snow',
                modules: { 
                    toolbar: toolbarOptions
                },
            });

        },100);
        
        await getInfoNosotros();
    }

}

NosotrosCtrl.$inject = ['$scope','link.factory','swal.service','cApp'];

let NosotrosComponent =  () => {
	return {
        templateUrl: "views/nosotros/nosotros.html",
        css:'views/nosotros/nosotros.css',
        controller: NosotrosCtrl
	}
}

angular
	.module('app')
	.component('nosotros' ,NosotrosComponent());
