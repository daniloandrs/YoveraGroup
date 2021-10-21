<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Nosotros;
use App\Archivo;
use DB; 

class ControllerNosotros extends Controller
{
    public function info ()
    {
        $info = Nosotros::with('archivos')->get()->find(Nosotros::FIRST_EMPRESA);

        if($info == null) {
            $info['id'] = null;
            $info['titulo'] = '';
            $info['descripcion'] = '';
            $info['mision'] = '';
            $info['vision'] = '';
        }   
            
        return infoJson($info,true); 
    }

    public function save (Request $request)
    {

        try{

            DB::beginTransaction(); 

            $id = $request->id;

            if ($request->create) {
                Nosotros::create($request->except(['id']));
            } else {
                $info = Nosotros::find($id);
                $info->update($request->all());    
            }

            DB::commit();         
            return messageJson('Información actualizada correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }

    public function addImage (Request $request)
    {
        try{ 
            DB::beginTransaction(); 

            $info = Nosotros::find($request->id);

            if ($request->hasFile('image')) {
                
                $image  = $request->file('image');

                $extension  = $image->extension();
                $name      = Carbon::now()->format('dmy-his');
                $url        = $name.'.'.$extension;

                $archivo = new Archivo();            
                $archivo->directorio = "nosotros";
                $archivo->url           = $url;
                $archivo->tipo_medio    = $extension;
                $archivo->tipo_archivo  = $extension;

                $info->archivos()->save($archivo);
                $image->storeAs($archivo->directorio,$url);
            }
            
            DB::commit();         

            return messageJson('Imagen añadida correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }


    public function editImage (Request $request)
    {
        try{ 

            DB::beginTransaction(); 

            $nosotros = Nosotros::with('archivos')->find($request->id);
            
            /** buscamos la imagen en la tabla polimorfica y la eliminamos */
            $archivo_delete = $nosotros->archivos->first(function ($archivo) use($request) {
                return $archivo->id == $request->file_id;
            });
            
            \Storage::delete($archivo_delete->directorio.'/'.$archivo_delete->url);
           
            if ($request->hasFile('image')) {
                $image  = $request->file('image');
                $extension  = $image->extension();
                $name      = Carbon::now()->format('dmy-his');
                $url        = $name.'.'.$extension;
                $archivo_delete->url  = $url;
                $archivo_delete->save();

                $image->storeAs($archivo_delete->directorio,$url);
            }

            DB::commit();         

            return messageJson('Imagen actualizada correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }


    public function deleteImage ($archivo_id)
    {
        try{ 

            DB::beginTransaction(); 

            $archivo = Archivo::find($archivo_id);

            \Storage::delete($archivo->directorio.'/'.$archivo->url);
            
            $archivo->forceDelete();

            DB::commit();         

            return messageJson('Imagen eliminada correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }


    public function updateLogo (Request $request)
    {
        try{ 

            DB::beginTransaction(); 

            if ($request->id == null)
                return meessageJson('Primero registre su descripción',false);
            
            $info = Nosotros::find($request->id);
            
            if ($request->hasFile('image')) {
                \Storage::delete($info->logo);
                $image  = $request->file('image');
                $url = saveFile($image,'nosotros');
                $info->logo = $url;
                $info->save();
            } 

            DB::commit();         

            return messageJson('Imagen actualizada correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }

    public function updateBanner (Request $request)
    {
        try{ 

            DB::beginTransaction(); 

            if ($request->id == null)
                return meessageJson('Primero registre su descripción',false);
            
            $info = Nosotros::find($request->id);
            
            if ($request->hasFile('image')) {
                \Storage::delete($info->banner);
                $image  = $request->file('image');
                $url = saveFile($image,'nosotros');
                $info->banner = $url;
                $info->save();
            } 

            DB::commit();         

            return messageJson('Imagen actualizada correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }

}
