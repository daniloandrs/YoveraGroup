<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ItemMenuSeeder extends Seeder
{
    public function run()
    {
        $items = [
    
            //SEGURIDAD
                [1,1],   
                [2,1],
                [3,1],
                
            //USUARIOS
                [4,1],
                [5,1],
                
            // Global
                [6,1],
                [7,1],
                [8,1],
        ];
        
        foreach ($items as $value) {
            DB::table('item_menu')->insert([
                'item_id'           => $value[0],
                'menu_id'        => $value[1],
                'created_at'    => Carbon::now()->format('Y-m-d H:i:s')
            ]);
        }
    }
}
