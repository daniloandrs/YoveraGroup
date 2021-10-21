<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Servicio;
use App\SubServicio;
use App\Editor;
use App\Archivo;
use DB; 
class ControllerSubServicio extends Controller
{
    public function getByServicio($servicio_id)
    {
        $servicio = Servicio::with('subservicios.editor','subservicios.archivos')->find($servicio_id);
        return infoJson($servicio,true); 
    } 

    public function create(Request $request)
    {
        try{
            DB::beginTransaction(); 

            $sub = SubServicio::create($request->only(['nombre','servicio_id']));
            $editor    = new Editor(); 
            $editor->contenido = $request->contenido;
            $sub->editor()->save($editor);

            DB::commit();

            return messageJson('sub servicio creado correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
        
    }

    public function edit(Request $request)
    {
        try{
            DB::beginTransaction(); 

            $sub = SubServicio::find($request->id);
            $sub->update($request->only(['nombre','servicio_id']));

            $sub->editor->contenido = $request->contenido;
            $sub->editor->update();
            DB::commit();

            return messageJson('sub servicio actualizado correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
        
    }

    public function delete($id)
    {
        try{

            DB::beginTransaction(); 

            $sub = SubServicio::find($id);
            
            $sub->delete();

            DB::commit();

            return messageJson('Sub servicio eliminado correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
        
    }

    public function addImages(Request $request)
    {
        try{

            DB::beginTransaction(); 
            
            
            $sub = SubServicio::find($request->sub_servicio_id);
 
            if ($request->hasFile('files')) {
                $images  = $request->file('files');  
                foreach($images as $image) { 
                    $extension  = $image->extension();
                    $url        = saveFilePolymorphic($image,'sub_servicios');
                    $archivo    = new Archivo(); 
                    $archivo->directorio = "sub_servicios";  
                    $archivo->url           = $url;
                    $archivo->tipo_medio    = $extension;
                    $archivo->tipo_archivo  = $extension;
                    $sub->archivos()->save($archivo);
                }

            }

            DB::commit();

            return messageJson('Imágenes añadidas correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }

    public function deleteImage($table_archivo_id)
    {
        try{

            DB::beginTransaction(); 

            $archivo = Archivo::find($table_archivo_id);
            \Storage::delete($archivo->directorio.'/'.$archivo->url);
            $archivo->delete();
            DB::commit();
            return messageJson('Imagen eliminada correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
 
    }
}
