<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ClienteCurso;
use App\Course;
use App\TemaryCourse;
use App\Archivo;

class ControllerMisCursos extends Controller
{
    
    public function misCursos (Request $request)
    {
        $token = $request->bearerToken();

        $user = ClienteCurso::where('app_token','=',$token)->first();

        if(!isset($user))
            return messageJson('el usuario no existe o su token a caducado. vualva a loguearse',false);
       
        $cursos = $user->cursos->each(function($item){return $item->teacher;});

        return infoJson($cursos,true);
    }


    public function miDetalleCurso (Request $request,$url_curso)
    {
        $token = $request->bearerToken();
        $user = ClienteCurso::where('app_token','=',$token)->first();
        if(!isset($user))
            return messageJson('el usuario no existe o su token a caducado. vualva a loguearse',false);
        
        $cursoDetalle = Course::with(
            'level',
            'type_course',
            'teacher',
            'category',
            'temario.temary_courses'
        )->where('url_course','=',$url_curso)->first();

        $cursoDetalle->makeHidden(['course_token']);
        
        $cursoDetalle->temario->each(function($item){
            $item->temary_courses->each(function($sub){
                $sub->makeHidden(['url_video']);
            });
        });

        return infoJson($cursoDetalle,true);
    }


    public function miClase(Request $request,$clase_url)
    {
        $token = $request->bearerToken();
        $user = ClienteCurso::where('app_token','=',$token)->first();
        if(!isset($user))
            return messageJson('el usuario no existe o su token a caducado. vualva a loguearse',false);
        
        $clase = TemaryCourse::with('temary.course','archivos')->find($clase_url);

        return infoJson($clase,true);
    }

    public function downloadFile(Request $request)
    {

        $file = Archivo::find($request->id);

        if(!isset($file))
            return messageJson('El archivo no esta disponible',false);

        $file_path = storage_path()."//app/".$file->directorio.'/'.$file->url;

        return response()->download($file_path);
    }
}
 