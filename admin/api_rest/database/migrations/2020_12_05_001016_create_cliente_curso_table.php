<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClienteCursoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */ 
    public function up()
    {
        Schema::create('cliente_curso', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombres',50)->nullable();
            $table->string('apellidos',80)->nullable();
            $table->string('password',200);
            $table->string('app_token',200);
            $table->string('documento_identidad',20)->unique();
            $table->string('email',250)->unique();
            $table->string('avatar',60)->default('avatars/default.png');
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
        Schema::dropIfExists('cliente_curso');
    }
}
