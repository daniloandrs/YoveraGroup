<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTemaryCourseTable extends Migration
{
    public function up() {
        
        Schema::create('temary_course', function (Blueprint $table) {
            
            $table->increments('id');

            $table->string('title',255)->nullable();
            
            $table->string('url_video',255)->nullable();
            
            $table->string('description',255)->nullable();
            
            $table->integer('duration')->nullable();
            
            $table->integer('temary_id')->unsigned()->index();
            
            $table->foreign('temary_id')->references('id')->on('temary')->onDelete('cascade');

            $table->integer('numeration')->nullable();
            
            $table->boolean('enabled')->default(true);
            
            $table->timestamps(); 
            
            $table->softDeletes();
        });
    }

    public function down() {
        
        Schema::dropIfExists('temary_course');
    }
}
