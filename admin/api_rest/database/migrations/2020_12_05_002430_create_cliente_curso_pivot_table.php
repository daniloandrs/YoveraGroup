<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClienteCursoPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cliente_curso_pivot', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('cliente_curso_id')->unsigned()->index()->nullable();
            $table->foreign('cliente_curso_id')->references('id')->on('cliente_curso')->onDelete('cascade');
            
            $table->integer('curso_id')->unsigned()->index()->nullable();
            $table->foreign('curso_id')->references('id')->on('course')->onDelete('cascade');
            
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
        Schema::dropIfExists('cliente_curso_pivot');
    }
}
