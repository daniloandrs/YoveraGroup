<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTypeCourseTable extends Migration
{
    public function up() {
        
        Schema::create('type_course', function (Blueprint $table) {
            
            $table->increments('id');

            $table->string('name',255)->nullable();
            
            $table->timestamps();
        
            $table->softDeletes();
            
        });
    }

    public function down() {
        
        Schema::dropIfExists('type_course');
    }
}
