<?php

#rutas pagina web
Route::group(['prefix'=>'page'], function () {
    Route::get('get_banner','ControllerPage@getBanner'); 
    Route::get('get_cursos','ControllerPage@getCursosHome');
    Route::get('get_clientes','ControllerPage@getClientes');
    

    Route::get('get_cursos_top','ControllerPage@getCursosTop'); 
    Route::get('get_servicios','ControllerNavbarPage@getServicios');
    Route::get('get_tipo_cursos','ControllerNavbarPage@getTipoCursos');
    Route::get('sub_servicio/{servicio_id}/{sub_id}','ControllerNavbarPage@getSubServicio');


    /**servicio */

    Route::get('servicio/{servicio_id}','ControllerNavbarPage@getServicio');
    

    /**vista sub_servicios */
    Route::get('get_sub_services/{service_id}','ControllerPageSubServices@getSubServices');

    /**contacto */
    Route::post('send_contact','ControllerPageContacto@create');
    
    /**Detalle Curso */
    Route::get('get_detalle_curso/{url}','ControllerPageDetalleCurso@getDetalle');


    /**ruta Login  */

    Route::post('login','ControllerLogin@login');
    


    /**Rutas autenticadas */

    Route::get('misCursos','ControllerMisCursos@misCursos');
    Route::get('mi_detalle_curso/{url}','ControllerMisCursos@miDetalleCurso');
    Route::get('get_clase/{id}','ControllerMisCursos@miClase');


    /**configuracion */
    Route::get('configuraciones','ControllerConfiguraciones@getConfiguraciones');
    
    /**donwload file */
    Route::post('download_file', 'ControllerMisCursos@downloadFile');

    Route::get('get_galeria','ControllerPage@getGaleria');
});
    
