<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ItemSeeder extends Seeder
{

    public function run()
    {
        $items = [
            //SEGURIDAD
                ['Menú','menu',1],
                ['Roles de Usuario','roles',1],
                ['Acciones de Usuario','acctions',1],
                
            //USUARIOS
                ['Gestionar','manager_users',2],
                ['Crear','create_users',2],
                
            // Global
                ['Error 404','page_not_found',3],
                ['Mi Perfil','profile',3],
                ['Crear Menú','menu/create',3],
            ];
        
        foreach ($items as $value) {
            DB::table('item')->insert([
                'nombre'        => $value[0],
                'url'           => $value[1],
                'opcion_id'     => $value[2],
                'created_at'    => Carbon::now()->format('Y-m-d H:i:s')
            ]);
        }
    }
}
