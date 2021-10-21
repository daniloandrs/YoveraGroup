<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Carbon\Carbon;
use App\GaleriaImagenes;
use App\Archivo;

class ControllerGaleriaImagen extends Controller
{
    public function create (Request $request) {
        
        try {
			 
			DB::beginTransaction();
            
			if ($request->hasFile('image'))
				$image_url 	= saveFile($request->file('image'),'galeria');
        
            $date = Carbon::parse(inputDateToString($request->fecha_publicacion))->format('Y-m-d');
             
            $data = [
                'image'  =>  $image_url,
                'titulo' => $request->titulo,
                'fecha_publicacion' => $date
            ];
            
			GaleriaImagenes::create($data);

			DB::commit();  
           	return messageJson('Galeria creada correctamente',true);

		} catch (\Exception $e) {
			DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }


    public function update (Request $request) {

        try {
            DB::beginTransaction();
            $galeria = GaleriaImagenes::find($request->get('id'));
            $date = Carbon::parse(inputDateToString($request->fecha_publicacion))->format('Y-m-d');
            $data = [
                'titulo' => $request->titulo,
                'fecha_publicacion' => $date
            ];

			if ($request->hasFile('image')) {
                \Storage::delete($galeria->image);
                $image_url 	= saveFile($request->file('image'),'galeria');
                $data['image'] = $image_url;
            }

            $galeria->update($data);

			DB::commit();  
           	return messageJson('Galeria creada correctamente',true);

		} catch (\Exception $e) {
			DB::rollBack();
            return messageJson($e->getMessage(),false);
        }

    }


    public function delete($id) {
        try {
            DB::beginTransaction();
            $item = GaleriaImagenes::find($id);
            \Storage::delete($item->image);
            $item->delete();
            DB::commit(); 
            return messageJson('Galeria eliminada correctamente',true);
        } catch (\Exception $e) {
            DB::rollBack();
            return self::personalizado($e->getMessage());
        }

    }

    public function getGaleria($galeria_id) {
        $galeria = GaleriaImagenes::find($galeria_id);
        return infoJson($galeria->archivos,true); 
    }

    public function addImagenes(Request $request) {
        try {
            DB::beginTransaction();
            
                $galeria_id = $request->galeria_id;
                $galeria = GaleriaImagenes::find($galeria_id);
                if ($request->hasFile('files')) { 
                    $files = $request->file('files');
                    foreach($files as $file) {
                        $extension  = $file->extension();
                        $url        = saveFilePolymorphic($file,'galeria_items');
                        $archivo    = new Archivo(); 
                        $archivo->directorio = "galeria_items";  
                        $archivo->url           = $url;
                        $archivo->tipo_medio    = $extension;
                        $archivo->tipo_archivo  = $extension;
                        $galeria->archivos()->save($archivo);
                    }
                }    
                
            DB::commit(); 
            return messageJson('Imágenes añadidas correctamente',true);
        } catch (\Exception $e) {
			DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }


    public function updateImage(Request $request) {
        try {
            DB::beginTransaction();

                $id = $request->id;

                $archivo = Archivo::find($id);

                if($request->hasFile('image')) {
                    \Storage::delete($archivo->directorio.'/'.$archivo->url);
                    $file       = $request->file('image');
                    $extension  = $file->extension();
                    $url        = saveFilePolymorphic($file,'galeria_items');
                    $archivo->url = $url;
                    $archivo->update();
                    
                } else {
                    return messageJson(' No se realizó ningún cambio',false);
                }

            DB::commit(); 
            
            return messageJson('Imagen actualizada correctamente.',true);

        } catch (\Exception $e) {
			DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }

    public function deleteImage($id) {
        try {
            DB::beginTransaction();
            $archivo = Archivo::find($id);
            //return messageJson($archivo,true);
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
