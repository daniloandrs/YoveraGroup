<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Course;

class ControllerPageDetalleCurso extends Controller
{
    public function getDetalle($url)
    {
        $cursoDetalle = Course::with(
            'level',
            'type_course',
            'teacher',
            'category',
            'temario.temary_courses'
        )->where('url_course','=',$url)->first();

        $cursoDetalle->makeHidden(['course_token']);
        
        $cursoDetalle->temario->each(function($item){
            $item->temary_courses->each(function($sub){
                $sub->makeHidden(['url_video']);
            });
        });

        return infoJson($cursoDetalle,true);
    }
}
