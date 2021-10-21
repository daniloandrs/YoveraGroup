<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;
use App\Course;
use App\TemaryCourse;
use App\Archivo;

class ControllerTemaryClass extends Controller {
    
    public function createClass (Request $request) {
        
        try {
    
            DB::beginTransaction();

            $data = $request->all();

            $temary_id  = $request->get('temary_id');

            $query      = TemaryCourse::where('temary_id','=',$temary_id)->max('numeration');

            $numeration = $query != null  ?  $query + 1 : 1;

            $data['numeration'] =  $numeration;

            $temary = TemaryCourse::create($data);

            if ($request->hasFile('video')) {
    
                $path   = 'cursos/'.md5($temary->title. time()).'/'.$temary->id;
    
                $video  = $request->file('video');
    
                $course_video = saveFile($video,$path);
                
                $temary->url_video = $course_video;

                $temary->duration = getVideoDuration(\Storage::path($temary->url_video));
                
            }
        
            $temary->update();
    
            DB::commit();
            
            return messageJson('Clase creada correctamente.',true);
            
        } catch (\Exception $e) {
                
            DB::rollBack();
            
            return messageJson($e->getMessage(),false);
        }

    }

    public function updateClass (Request $request) {

        try {
    
            DB::beginTransaction();

            $temary = TemaryCourse::find($request->get('id'));

            $temary->update($request->all());

            if ($request->hasFile('video')) {
                
                \Storage::delete($temary->url_video);

                $path   = 'cursos/'.md5($temary->title. time()).'/'.$temary->id;
    
                $video  = $request->file('video');
    
                $course_video = saveFile($video,$path);
                
                $temary->url_video = $course_video;

                $temary->duration = getVideoDuration(\Storage::path($temary->url_video));
                
            }
        
            $temary->update();

            DB::commit();
            
            return messageJson('Clase editada correctamente',true);
            
        } catch (\Exception $e) {
                
            DB::rollBack();
            
            return messageJson($e->getMessage(),false);
        }

    }


    public function deleteClass ($temary_id) {

        try { 
    
            DB::beginTransaction();

            $temary = TemaryCourse::find($temary_id);
    
            $before = TemaryCourse::where('numeration','>',$temary->numeration)->get(); 
            
            foreach ($before as $item) {

                $item->numeration = $item->numeration - 1;

                $item->update();
            }

            \Storage::delete($temary->url_video);
    
            $temary->delete();
            
            DB::commit();
            
            return messageJson('Clase eliminada correctamente',true);
            
        } catch (\Exception $e) {
                
            DB::rollBack();
            
            return messageJson($e->getMessage(),false);
        }

    }


    public function deletAdjunto($id)
    {
        try{
            DB::beginTransaction(); 
            $file = Archivo::find($id);
            $file->delete();
            DB::commit();
            return messageJson('Archivo eliminado correctamente',true);
        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
        
    }

    public function sendAdjuntos(Request $request)
    {
        try{
            DB::beginTransaction(); 
            $temaryCourse = TemaryCourse::find($request->temary_class_id);

            if ($request->hasFile('adjuntos')) {
                $adjuntos  = $request->file('adjuntos');  
                foreach($adjuntos as $file) { 
                    $extension  = $file->extension();
                    $url        = saveFilePolymorphic($file,'adjuntos');
                    $archivo    = new Archivo(); 
                    $archivo->directorio = "adjuntos";  
                    $archivo->url           = $url;
                    $archivo->tipo_medio    = $extension;
                    $archivo->tipo_archivo  = $extension;
                    $temaryCourse->archivos()->save($archivo);
                }
            }

            DB::commit();
            return messageJson('Adjuntos añadidos correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }


}
   