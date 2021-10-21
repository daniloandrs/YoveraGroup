<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    
    public function run()
    {
        $this->call(RolSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(MenuSeeder::class);
        $this->call(OpcionSeeder::class);
        $this->call(ItemSeeder::class);
        $this->call(ItemMenuSeeder::class);
        $this->call(RolUserSeeder::class);
    }
}
