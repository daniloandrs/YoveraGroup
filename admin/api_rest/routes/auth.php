<?php

use Illuminate\Http\Request;

Route::post('autenticate','ControllerAutenticate@login');
    
Route::group(['middleware' =>'authorize','prefix'=>'auth'], function () {

    Route::post('change_password', 'ControllerAutenticate@changePassword');
    
    Route::post('logout', 'ControllerAutenticate@logout');

});