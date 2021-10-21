<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class MenuSeeder extends Seeder
{
    
    public function run()
    {
        $rol_id = 1; // rol super_administrador 
        
        DB::table('menu')->insert([
            'nombre'     => 'Super Administrador',
            'rol_id'    => $rol_id,
            'created_at'=> Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
}
