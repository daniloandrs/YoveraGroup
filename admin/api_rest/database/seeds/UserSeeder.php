<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            'name'      => 'super',
            'email'     => 'super@gmail.com',
            'password'  => bcrypt('super'),
            'created_at'=> Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
}
