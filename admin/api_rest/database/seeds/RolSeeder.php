<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RolSeeder extends Seeder
{
    
    public function run()
    {
        
        DB::table('rol')->insert([
            'key'           => 'sa',
            'nombre'        => 'Super Administrador',
            'nivel'         => 0,
            'descripcion'   => "Rol maximo en el sistema",
            'created_at'    => Carbon::now()->format('Y-m-d H:i:s')
        ]);

    }
}
