
const aplication = [
    
	/** Route - run */
	'modules/init/init.js',
	'modules/init/routes.js',
	'modules/init/run.js',
    
    /** Constants */
	'modules/app/constants/app.js',

	/** Components */
	'modules/app/components/loader/loader.js',
	'modules/app/components/page-not-found/page-not-found.js',
	'modules/app/components/utilities/utilities.js',
	'modules/app/components/html-compile/html-compile.js',
	
	/**componetnt views */

	'components/service-list-component/service-list-component.js',
	'components/card-curso/card-curso.js',
	
	/** Services */
	'modules/app/services/link.js',
	'modules/app/services/memory.js',
	'modules/app/services/session.js',
	'modules/app/services/storage.js',
	'modules/app/services/firebase.js',
	'modules/app/services/utils.js',
	'modules/app/services/owlservice.js',
	'modules/app/services/toast.service.js',
	'modules/app/services/user.service.js',
	
	/** Views */
	'views/index.js',
	'views/home/home.js',

	'views/system/navbar/navbar.js',
	'views/system/dashboard/dashboard.js',
	
	'views/nosotros/nosotros.js',
	'views/vision/vision.js',
	'views/mision/mision.js',
	
	'views/sub-servicio/sub-servicio.js',
	'views/footer/footer.js',
	'views/contact/contact.js',
	'views/cursos/cursos.js',
	'views/curso-detalle/curso-detalle.js',
	'views/login/login.js',
	'views/mis-cursos/mis-cursos.js',
	'views/mis-cursos-detalle/mis-cursos-detalle.js',
	'views/servicio/servicio.js',
	'views/cliente/cliente.js',
	'views/galeria-imagenes/galeria-imagenes.js'
];


loadScripts(aplication,false);