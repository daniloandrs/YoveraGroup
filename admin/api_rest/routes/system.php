<?php

use Illuminate\Http\Request;

Route::group(['middleware' =>'authorize','prefix'=>'system'], function () {
    Route::post('menu_selected','ControllerMenu@menuSelected');
    Route::post('give_item','ControllerMenu@giveItem');
    Route::post('user_register','ControllerUser@registerUser');
    Route::post('user_update','ControllerUser@updateUser');
    Route::post('password_update','ControllerUser@updatePassword');
});
 
  
Route::group(['middleware' =>'authorize','prefix'=>'crud'], function () {
    Route::post('getdata','ControllerCrud@getData');
    Route::post('showdata','ControllerCrud@showData');
    Route::post('create','ControllerCrud@create');
    Route::put('update','ControllerCrud@update');
    Route::post('delete','ControllerCrud@delete');
});
