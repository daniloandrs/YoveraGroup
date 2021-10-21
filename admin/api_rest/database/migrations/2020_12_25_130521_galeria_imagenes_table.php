<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GaleriaImagenesTable extends Migration
{
    public function up()
    {
        Schema::create('galeria_imagenes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('titulo',255)->nullable();
            $table->date('fecha_publicacion')->nullable();
            $table->string('image',255)->nullable();
            $table->timestamps();  
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('galeria_imagenes');
    }
}
