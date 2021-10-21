<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBannerTable extends Migration {
    
    public function up() {

        Schema::create('banner', function (Blueprint $table) {
           
            $table->increments('id');
            
            $table->string('banner_image',255)->nullable();        
            
            $table->string('title',255)->nullable();
            
            $table->string('description',255)->nullable();
            
            $table->integer('order')->nullable();
            
            $table->boolean('enabled')->default(true);
            
            $table->string('button_title',255)->nullable();
            
            $table->string('redirect_to',255)->nullable();
            
            $table->timestamps();

            $table->softDeletes();
       
        });
    }

    public function down() {

        Schema::dropIfExists('banner');
    }
}
