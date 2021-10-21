<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeacherTable extends Migration
{
    public function up() {
        
        Schema::create('teacher', function (Blueprint $table) {
            
            $table->increments('id');

            $table->string('name',255)->nullable();
            
            $table->string('email',255)->nullable();
            
            $table->string('country',255)->nullable();
            
            $table->string('specialty',255)->nullable();
            
            $table->timestamps();
        
            $table->softDeletes();
            
        });
    }

    public function down() {
        
        Schema::dropIfExists('teacher');
    }
}
