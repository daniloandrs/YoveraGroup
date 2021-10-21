<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTemaryTable extends Migration {
    
    public function up() {
        
        Schema::create('temary', function (Blueprint $table) {
            
            $table->increments('id');

            $table->string('title',255)->nullable();
            
            $table->string('description',255)->nullable();
            
            $table->integer('course_id')->unsigned()->index();
            
            $table->foreign('course_id')->references('id')->on('course')->onDelete('cascade');

            $table->integer('numeration')->nullable();
            
            $table->boolean('enabled')->default(true);
            
            $table->timestamps(); 
            
            $table->softDeletes();
        });
    }

    public function down() {
        
        Schema::dropIfExists('temary');
    }
}
