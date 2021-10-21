<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormContactoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('form_contacto', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre',50);
            $table->string('email',100);
            $table->string('telefono',50)->nullable();
            $table->string('asunto',50)->nullable();
            $table->string('mensaje',255);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('form_contacto');
    }
}
