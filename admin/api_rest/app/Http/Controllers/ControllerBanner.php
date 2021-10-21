<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Banner;

use DB;

class ControllerBanner extends Controller {

    public function create (Request $request) {

        try {
    
            DB::beginTransaction();

            $query = Banner::max('order');

            $order = $query != null ? $query + 1 : 1;

            $data = Parse($request->except(['banner_image']));
            
            $banner = Banner::create($data + ['order' => $order]);
    
            if ($request->hasFile('banner_image')) {
    
                $path   = 'banner/'.$banner->id;
    
                $image  = $request->file('banner_image');
    
                $banner_image = saveFile($image,$path);
                
                $banner->banner_image = $banner_image;
            
            }
        
            $banner->update();
    
            DB::commit(); 
                     
            return messageJson('Banner creado correctamente',true);
            
        } catch (\Exception $e) {
            
            DB::rollBack();
            
            return messageJson($e->getMessage(),false);
        }
  
    }

    public function update (Request $request) {

		try {

			DB::beginTransaction();

			$banner = Banner::find($request->get('id'));
            
            $data = Parse($request->except(['banner_image']));

            $banner->update($data);

			if($request->hasFile('banner_image')) {
                
                $path   = 'banner/'.$banner->id;

				$image = $request->file('banner_image');
				
				\Storage::delete($banner->banner_image);
				
                $banner_image = saveFile($image,$path);
                
                $banner->banner_image = $banner_image;
                
                $banner->update();
			}

			DB::commit();
           	
           	return messageJson('Banner actualizado correctamente',true);

		} catch (\Exception $e) {

			DB::rollBack();
            
            return messageJson($e->getMessage(),false);
		}
    }
    
    public function updateOrder(Request $request) {
	
		try {
			DB::beginTransaction();
			
			$anterior = Banner::find($request->get('anterior_posicion_id'));
            
            $nuevo    = Banner::find($request->get('nueva_posicion_id'));

			$tmp_anterior = $anterior->order;
            
            $tmp_nuevo    = $nuevo->order;
			
			$anterior->order  = $tmp_nuevo;

			$nuevo->order     = $tmp_anterior;

            $anterior->update();
            
			$nuevo->update();
			
			DB::commit();
           	
           	return messageJson("Posición actualizada correctamente.",true);

		} catch (\Exception $e) {

			DB::rollBack();
             
            return messageJson($e->getMessage(),false);
		}	
    }

    public function delete ($id) {
 
		try {
        
            DB::beginTransaction(); 
			
			$banner = Banner::find($id);
			
			if(is_null($banner))
				return messageJson("Banner eliminado anteriormente.",true);
			
			\Storage::delete($banner->src_imagen);
			
			$banner->delete();

            DB::commit();
            
           	return messageJson("Banner eliminado correctamente.",true);

		} catch (\Exception $e) {
            
            DB::rollBack();
            
            return messageJson($e->getMessage(),false);
		}
	}
    
}
