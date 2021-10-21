<?php

namespace App\Http\Controllers\System;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\AuthModel\Menu;
use App\AuthModel\Opcion;
use App\AuthModel\Item;
use Carbon\Carbon;
use DB;

class ControllerMenu extends Controller
{
    public function getMenu(Request $request)
    {
        $menu = Menu::all();
        
        return infoJson($menu,true);
    }

    public function menuSelected(Request $request)
    {
        $menu_id = $request->get('menu_id');
        
        $options = Opcion::with('items')->get();

        foreach ($options as $option) {
            
            foreach ($option->items as $item) {
                
                $item->isSelected = $item->menus->contains('id',$menu_id);
                
                $item->addHidden('menus');

            }
        }
           
        return infoJson($options,true);
    }

    
    public function giveItem (Request $request) {
        
        try {

            DB::beginTransaction();

            $message;

            $item_id = $request->get('item_id');
            
            $menu_id = $request->get('menu_id');
            
            if ($request->get('add')) {

                DB::table('item_menu')->insert([
            
                    'item_id' => $item_id, 
                    'menu_id' => $menu_id,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s')
                ]); 
                
                $message = 'Añadido correctamente';

            } else {

                DB::table('item_menu')->where('item_id',$item_id)->where('menu_id',$menu_id)->delete();

                $message = 'Cambiado corretamente';

            }

            DB::commit();

            return  messageJson($message,true);

        } catch(\Exception $e) {

            DB::rollback();

            return  messageJson($e->getMessage(),false);
        
        }  

        

    }
}
 