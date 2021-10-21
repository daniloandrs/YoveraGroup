<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCourseTable extends Migration
{
    public function up() {
        
        Schema::create('course', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',255)->nullable();
            $table->string('url_course',255)->nullable();
            $table->string('background_image',255)->nullable();
            $table->string('description',255)->nullable();
            $table->integer('level_id')->unsigned()->index();
            $table->foreign('level_id')->references('id')->on('level')->onDelete('cascade');
            $table->integer('category_id')->unsigned()->index();
            $table->foreign('category_id')->references('id')->on('category')->onDelete('cascade');
            $table->integer('type_course_id')->unsigned()->index();
            $table->foreign('type_course_id')->references('id')->on('type_course')->onDelete('cascade');
            $table->integer('teacher_id')->unsigned()->index();
            $table->foreign('teacher_id')->references('id')->on('teacher')->onDelete('cascade');
            $table->dateTime('release_date')->nullable();
            $table->decimal('duration',8,2)->nullable();
            $table->decimal('precio',10,2)->nullable();
            $table->string('presentation_video',255)->nullable();
            $table->longText('about')->nullable();
            $table->longText('course_token')->unique();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down() {
        
        Schema::dropIfExists('course');
    }
}
