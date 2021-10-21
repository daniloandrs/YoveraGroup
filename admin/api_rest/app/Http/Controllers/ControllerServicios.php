<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Servicio;
use App\{Archivo,Editor};
use DB; 
class ControllerServicios extends Controller
{
    public function get()
    {
        $servicios = Servicio::with('archivos','editor')->get();
        return infoJson($servicios,true); 
    }

    public function create(Request $request)
    {
        try{
            DB::beginTransaction(); 

            $servicio = Servicio::create($request->only(['nombre','descripcion']));
 
            if ($request->hasFile('image')) {
                $image      = $request->file('image');
                $extension  = $image->extension();
                $url        = saveFile($image,'servicios');
                $servicio->icono = $url;
                $servicio->update();
            }
            
            $editor    = new Editor(); 
            $editor->contenido = '';
            $servicio->editor()->save($editor);
            
            DB::commit();

            return messageJson('servicio creado correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
        
    }


    public function edit(Request $request)
    {
        try{
            DB::beginTransaction(); 

            $servicio = Servicio::find($request->id);
 
            if ($request->hasFile('image')) {
                
                \Storage::delete($servicio->icono);

                $image      = $request->file('image');
                $url        = saveFile($image,'servicios');
                $servicio->icono = $url;
            }
            $servicio->nombre = $request->nombre;
            $servicio->descripcion = $request->descripcion;

            $servicio->update();
            DB::commit();

            return messageJson('Servicio actualizado correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
        
    }


    public function delete($id)
    {
        try{
            DB::beginTransaction(); 
            $servicio = Servicio::find($id);
            $servicio->delete();
            DB::commit();
            return messageJson('Servicio eliminado correctamente',true);
        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
        
    }


    public function deleteImageTable($id)
    {
        try{
            DB::beginTransaction(); 
            $file = Archivo::find($id);
            $file->delete();
            DB::commit();
            return messageJson('Imagen eliminada correctamente',true);
        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
        
    }

    public function addImages(Request $request)
    {
        try{
            DB::beginTransaction(); 
            
            $servicio = Servicio::find($request->servicio_id);

            if ($request->hasFile('files')) {
                $images  = $request->file('files');  
                foreach($images as $image) { 
                    $extension  = $image->extension();
                    $url        = saveFilePolymorphic($image,'servicios');
                    $archivo    = new Archivo(); 
                    $archivo->directorio = "servicios";  
                    $archivo->url           = $url;
                    $archivo->tipo_medio    = $extension;
                    $archivo->tipo_archivo  = $extension;
                    $servicio->archivos()->save($archivo);
                }
            }
 
            DB::commit();
            return messageJson('Imágenes añadidas correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }


    public function updateContenido (Request $request)
    {
        try {
            DB::beginTransaction(); 
            
            $servicio = Servicio::find($request->servicio_id);
            $servicio->editor->contenido = $request->contenido;
            $servicio->editor->update();
            DB::commit();
            return messageJson('Contenido del servicio actualizado correctamente',true);
        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }
} 
