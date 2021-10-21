<?php

namespace App\Http\Controllers\System;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class ControllerCrud extends Controller {

    public function getData(Request $request) {

        $class = $request->get('model'); 
        
        $model = new $class();
        
        $query = $model::query();
        
        if($request->relations != null)
            $instance = $model::with($request->relations)->get();
        else   
            $instance = $model::all();

        return  infoJson($instance,true);

    }

    public function showData(Request $request) {
        
        $class = $request->get('model');
        
        $id = $request->get('id');

        $model = new $class();
        
        $instance = $model::find($id);

        return  infoJson($instance,true);
    }


    public function create(Request $request) {

        try {
        
            DB::beginTransaction();

                $message; $success;

                $class = $request->get('model');
                   
                $model = new $class();

                if( $model->validate($request->all()) ) {

                    $instance = $model::create($request->all());

                    $message = 'Creado Correctamente';
                    
                    $success = true;
                    
                } else {

                    $message = $model->validationErrors();
                    
                    $success = false;
                
                }

            DB::commit();

            return  messageJson($message,$success);
                
        } catch(\Exception $e) {

            DB::rollback();
            return  messageJson($e->getMessage(),false);
        
        }  

    }

    public function update(Request $request)
    {
        try {
        
            DB::beginTransaction();

                $message; $success;

                //$class = '\\App\AuthModel\\'.$request->get('model');

                $class = $request->get('model');

                $model = new $class();

                $id = $request->get('id');

                $instance = $model::find($id);
                
                if( $model->validate($request->all()) ) {
                    
                    if (empty($model::$rules)) {

                        $message ="No se realizo ninguna modificación";
                        $success = true;
                    
                    } else {
                    
                        $instance->update($request->all());

                        $message = 'Actualizado Correctamente';
                        
                        $success = true;
                    }
                    
                } else {

                    $message = $model->validationErrors();
                    
                    $success = false;
                
                }

            DB::commit();

            return  messageJson($message,$success);
                
        } catch(\Exception $e) {

            DB::rollback();
            return  messageJson($e->getMessage(),false);
        
        }  

    }
    

    public function delete (Request $request)
    {
        try {
        
            DB::beginTransaction();

                $message; $success;

                $class = $request->get('model');
                
                $id = $request->get('id');

                $model = new $class();
                
                $instance = $model::find($id);

                if ($instance) {
                
                    $instance->delete();
                    $message = 'Eliminado Correctamente.';
                    $success = true;
                
                } else {

                    $message = 'Este elemento ya ha sido eliminado.';
                    $success = false;
                }
            
            DB::commit();

            return  messageJson($message,$success);

        } catch(\Exception $e) {

            DB::rollback();
            
            return  messageJson($e->getMessage(),false);
        
        }  

    }
    
}
