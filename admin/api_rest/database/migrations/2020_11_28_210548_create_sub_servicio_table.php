<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubServicioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sub_servicio', function (Blueprint $table) {

            $table->increments('id');
            $table->string('nombre',255)->nullable();
            $table->integer('servicio_id')->unsigned()->index();            
            $table->foreign('servicio_id')->references('id')->on('servicio')->onDelete('cascade');
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sub_servicio');
    }
}
