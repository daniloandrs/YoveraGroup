<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ItemMenu extends Migration
{
    public function up()
    {
        Schema::create('item_menu', function (Blueprint $table) {
            
            $table->increments('id');
            $table->integer('item_id')->unsigned()->index()->nullable();
            $table->foreign('item_id')->references('id')->on('item')->onDelete('cascade');
            
            $table->integer('menu_id')->unsigned()->index()->nullable();
            $table->foreign('menu_id')->references('id')->on('menu')->onDelete('cascade');
            
            $table->timestamps();   
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('item_menu');
    }
}
