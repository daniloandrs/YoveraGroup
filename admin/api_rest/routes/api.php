<?php

# rutas administrador

Route::group(['middleware' =>'authorize','prefix'=>'banner'], function () {
    Route::post('create','ControllerBanner@create');
    Route::post('update','ControllerBanner@update');
    Route::post('update_order','ControllerBanner@updateOrder');
    Route::delete('{banner_id}','ControllerBanner@delete');
});
 
Route::group(['middleware' =>'authorize','prefix'=>'course'], function () {
    Route::post('create','ControllerCourse@create');
    Route::post('update','ControllerCourse@update');
    Route::delete('{course_id}','ControllerCourse@delete');
    Route::post('create_contenido','ControllerCourse@createContenido');
});
 
Route::group(['middleware' =>'authorize','prefix'=>'temary'], function () {
    Route::get('{course_id}','ControllerTemary@getTemary');
    Route::post('create','ControllerTemary@createModule');
    Route::post('update','ControllerTemary@updateModule');
});

Route::group(['middleware' =>'authorize','prefix'=>'temary_class'], function () {
    Route::post('create','ControllerTemaryClass@createClass');
    Route::post('update','ControllerTemaryClass@updateClass');
    Route::delete('delete/{id}','ControllerTemaryClass@deleteClass');

    Route::post('send_adjuntos','ControllerTemaryClass@sendAdjuntos');
    Route::delete('delete_adjunto/{id}','ControllerTemaryClass@deletAdjunto');
});

#nosotros
Route::group(['prefix'=>'nosotros'], function () {
    Route::get('info','ControllerNosotros@info');
    Route::post('save','ControllerNosotros@save');
    Route::post('add_image','ControllerNosotros@addImage');
    Route::post('edit_image','ControllerNosotros@editImage');
    Route::post('update_banner','ControllerNosotros@updateBanner');
    Route::post('update_logo','ControllerNosotros@updateLogo');
    Route::delete('delete/{id}','ControllerNosotros@deleteImage');
});
 
 #servicios
Route::group(['middleware' =>'authorize','prefix'=>'servicios'], function () {
    Route::get('get','ControllerServicios@get');
    Route::post('create','ControllerServicios@create');
    Route::post('edit','ControllerServicios@edit');
    Route::delete('delete/{id}','ControllerServicios@delete');
    Route::post('add_images','ControllerServicios@addImages');
    Route::delete('delete_image_table/{id}','ControllerServicios@deleteImageTable');
    Route::post('update_contenido','ControllerServicios@updateContenido');
});


 #cliente
 Route::group(['middleware' =>'authorize','prefix'=>'cliente'], function () {
    Route::get('get','ControllerCliente@get');
    Route::post('create','ControllerCliente@create');
    Route::post('edit','ControllerCliente@edit'); 
    Route::delete('delete/{id}','ControllerCliente@delete');
});
 
#sub_servicios
Route::group(['middleware' =>'authorize','prefix'=>'sub_servicio'], function () {
    Route::get('get_by_servicio/{servicio_id}','ControllerSubServicio@getByServicio');
    Route::post('create','ControllerSubServicio@create');
    Route::post('edit','ControllerSubServicio@edit');
    Route::delete('delete/{id}','ControllerSubServicio@delete');
    Route::post('add_images','ControllerSubServicio@addImages');
    Route::delete('delete_image/{id}','ControllerSubServicio@deleteImage');
});
 
#registrar clientes desde administrador
Route::group(['middleware' =>'authorize','prefix'=>'cliente_curso'], function () {
    Route::post('create','ControllerClienteCurso@create');
    Route::post('update','ControllerClienteCurso@update');
    Route::delete('delete/{id}','ControllerClienteCurso@delete');

    Route::get('get_mis_cursos/{user_id}','ControllerClienteCurso@getMisCursos');
    Route::post('add_mis_cursos','ControllerClienteCurso@addMisCursos');
    
});
 

Route::group(['middleware' =>'authorize','prefix'=>'contacto'], function () {
    Route::get('get_configuraciones','ControllerConfiguraciones@getConfiguraciones');
    Route::post('set_configuraciones','ControllerConfiguraciones@setConfiguraciones');
    Route::post('update','ControllerConfiguraciones@update');
    Route::delete('delete/{id}','ControllerConfiguraciones@delete');
});
 

Route::group(['middleware' =>'authorize','prefix'=>'galeria'], function () {
   Route::post('create','ControllerGaleriaImagen@create');
   Route::post('update','ControllerGaleriaImagen@update');
   Route::delete('delete/{id}','ControllerGaleriaImagen@delete');

   /**imagenes */
   Route::get('get_imagenes/{galeria_id}','ControllerGaleriaImagen@getGaleria');
   Route::post('add_imagenes','ControllerGaleriaImagen@addImagenes');
   Route::post('update_imagen_item','ControllerGaleriaImagen@updateImage');
   Route::delete('delete_image/{id}','ControllerGaleriaImagen@deleteImage');
    
});