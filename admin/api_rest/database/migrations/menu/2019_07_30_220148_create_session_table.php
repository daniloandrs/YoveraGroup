<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSessionTable extends Migration
{

    public function up()
    {
        Schema::create('session', function (Blueprint $table) {
            $table->increments('id');
            $table->string('token',60)->unique();
            $table->string('dispositivo',100)->nullable();
            $table->ipAddress('ip')->nullable();
            $table->integer('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('session');
    }
}
