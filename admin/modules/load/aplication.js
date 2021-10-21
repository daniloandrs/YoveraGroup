
const aplication = [
    
	/** Route - run */
	'modules/init/init.js',
	'modules/init/routes.js',
	'modules/init/run.js',
    
    /** Constants */
	'modules/app/constants/app.js',

	/** Components */
	'modules/app/components/loader/loader.js',
	'modules/app/components/footer/footer.js',
	'modules/app/components/page-not-found/page-not-found.js',
	'modules/app/components/utilities/utilities.js',
	'modules/app/components/inputsearch/inputsearch.component.js',
	
	/** Services */
	'modules/app/services/link.js',
	'modules/app/services/memory.js',
	'modules/app/services/session.js',
	'modules/app/services/storage.js',
	'modules/app/services/firebase.js',
	'modules/app/services/utils.js',
	'modules/app/services/helperDropzone.js',
	
	/** Views */
	'views/index.js',
	'views/home/home.js',
	'views/system/navbar/navbar.js',
	'views/system/sidebar/sidebar.js',
	'views/system/dashboard/dashboard.js',
	'views/system/dashboard/administrar/administrar.js',
	'views/system/user_roles/user_roles.js',

	'views/maintenance/category/category.js',
	'views/maintenance/level/level.js',
	'views/maintenance/type_course/type_course.js',
	'views/maintenance/teacher/teacher.js',
	'views/course/course.js',
	'views/banner/banner.js',
	'views/course/temary/temary.js',
	'views/nosotros/nosotros.js',
	'views/servicios/servicios.js',
	'views/servicio-detalle/servicio-detalle.js',
	'views/cursos-clientes/cursos-clientes.js',
	'views/configuraciones/configuraciones.js',
	'views/contacto/contacto.js',
	'views/cliente/cliente.js',

	/** registro de usuarios */
	'views/usuarios/registrar/registrar.js',
	'views/usuarios/administrar/administrar.js',

	/**prensa */
	'views/prensa/g-fotografica/g-fotografica.js',
	'views/prensa/g-fotografica/g-item/g-item.js'
];

loadScripts(aplication);