<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Banner;
use App\Course;
use App\Cliente;
use App\GaleriaImagenes;

class ControllerPage extends Controller {
    
    public function getBanner () {

        $banner = Banner::orderBy('order')->get();

        return infoJson($banner,true);
        
    }


    public function getCursosHome () {
        
        $courses = Course::with('teacher')->orderBy('release_date','DESC')->get();

        $courses->each(function($item) {
            
            $item->makeHidden([
                'category_id',
                'course_token',
                'teacher_id',
                'type_course_id',
                'level_id',
                'duration',
                'id',
                'presentation_video'
            ]);

        });

        return infoJson($courses,true);

    }


    public function getCursosTop () {
        $courses = Course::with('teacher')->orderBy('release_date','DESC')->take(5)->get();
        $courses->each(function($item) {
            $item->makeHidden([
                'category_id',
                'course_token',
                'teacher_id',
                'type_course_id',
                'level_id',
                'duration',
                'id',
                'presentation_video'
            ]);

        });

        return infoJson($courses,true);

    }


    public function getClientes () {
        $clientes = Cliente::all();
        return infoJson($clientes,true);
    }

    public function getGaleria() {
        $galerias = GaleriaImagenes::with('archivos')->get();
        return infoJson($galerias,true);
    }

}
