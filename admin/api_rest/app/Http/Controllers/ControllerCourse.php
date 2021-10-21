<?php

namespace App\Http\Controllers;

use DB;

use Carbon\Carbon;

use App\Course;

use Illuminate\Http\Request;

class ControllerCourse extends Controller {
    
    public function create (Request $request) {

        try {
    
            DB::beginTransaction();
            
            $data = $request->except(['background_image','presentation_video']);
    
            $data['course_token']   = randomToken();
    
            $data['release_date']  = nowDate();
            
            $course = Course::create($data);
            
            $path   = 'course/'.$course->course_token;

            if ($request->hasFile('background_image')) {
    
                $image  = $request->file('background_image');
    
                $background_image = saveFile($image,$path);
                
                $course->background_image = $background_image;
            
            } 
    
            if ($request->hasFile('presentation_video')) {
    
                $image  = $request->file('presentation_video');
    
                $presentation_video = saveFile($image,$path);
                
                $course->presentation_video = $presentation_video;
            
            } 
        
            $course->update();
    
            DB::commit(); 
                    
            return messageJson('Curso creado correctamente',true);

        } catch (\Exception $e) {
            
            DB::rollBack();
            
            return messageJson($e->getMessage(),false);
        }
  
    }

    public function createContenido (Request $request)
    {
        try {
            DB::beginTransaction();
            $course = Course::find($request->id);
            $course->about = $request->about;
            $course->update();
            DB::commit();        
            return messageJson('Contenido añadido correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }

    public function update (Request $request) {

        try {
    
            DB::beginTransaction();
            
            $course = Course::find($request->get('id'));

            $data   = $request->except(['background_image','presentation_video']);

            $data['release_date']  = nowDate();

            $data['duration'] = ($data['duration'] == 'null') ? null : $data['duration'];

            $course->update($data);
            
            $path  = 'course/'.$course->course_token;

            if ($request->hasFile('background_image')) {
                
                \Storage::delete($course->background_image);

                $image = $request->file('background_image');
    
                $background_image = saveFile($image,$path);
                
                $course->background_image = $background_image;
            
            } 
    
            if ($request->hasFile('presentation_video')) {
                
                \Storage::delete($course->presentation_video);
    
                $image  = $request->file('presentation_video');
    
                $presentation_video = saveFile($image,$path);
                
                $course->presentation_video = $presentation_video;
            
            } 
        
            $course->update();
    
            DB::commit(); 
                    
            return messageJson('Curso actualizado correctamente',true);

        } catch (\Exception $e) {
            
            DB::rollBack();
            
            return messageJson($e->getMessage(),false);
        }
  
    }
    

    public function delete ($id) {

		try {
        
            DB::beginTransaction(); 
			
			$course = Course::find($id);
			
			if(is_null($course))
				return messageJson("Curso eliminado anteriormente.",true);
			 
			\Storage::delete($course->background_image);
            
            \Storage::delete($course->presentation_video);

			$course->delete();

            DB::commit();
            
           	return messageJson("Curso eliminado correctamente.",true);

		} catch (\Exception $e) {
            
            DB::rollBack();
            
            return messageJson($e->getMessage(),false);
		}
	}
}
