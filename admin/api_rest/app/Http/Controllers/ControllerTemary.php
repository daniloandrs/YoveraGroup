<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;

use App\Course;

use App\Temary;

class ControllerTemary extends Controller {
    
    public function getTemary ($course_id) {

        $temaryList = Temary::with('temary_courses.archivos')->where('course_id','=',$course_id)->get();

        foreach ($temaryList as $temary) {
            $temary->temary_courses;    
        }

        return infoJson($temaryList,true);

    }

    public function createModule (Request $request) {

        try {
    
            DB::beginTransaction();

            $data = $request->all();

            $course_id = $request->get('course_id'); 
            
            $query = Temary::where('course_id','=',$course_id)->max('numeration');

            $numeration = $query != null  ?  $query + 1 : 1;

            $data['numeration'] = $numeration;

            $temary = Temary::create($data);

            DB::commit();
            
            return messageJson('Módulo creado correctamente',true);
            
        } catch (\Exception $e) {
                
            DB::rollBack();
            
            return messageJson($e->getMessage(),false);
        }

    }

    public function updateModule (Request $request) {

        try {
    
            DB::beginTransaction();

            $temary = Temary::find($request->get('id'));

            $temary->update($request->all());

            DB::commit();
            
            return messageJson('Módulo editado correctamente',true);
            
        } catch (\Exception $e) {
                
            DB::rollBack();
            
            return messageJson($e->getMessage(),false);
        }

    }

}
