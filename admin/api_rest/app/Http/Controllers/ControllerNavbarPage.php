<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Servicio;
use App\SubServicio;
use App\Category;
class ControllerNavbarPage extends Controller
{
    
    public function getServicios ()
    {
        $servicios = Servicio::with('archivos','subservicios')->get();
        return infoJson($servicios,true);
    }

    public function getTipoCursos()
    {
        $tipoCursos = Category::all();
        return infoJson($tipoCursos,true);
    }

    public function getSubServicio ($servicio_id,$sub_id)
    {
        $subServicio = SubServicio::with('archivos','editor','servicio')->where('id','=',$sub_id)
            ->where('servicio_id','=',$servicio_id)->first();

        return infoJson($subServicio,true);
    }

    public function getServicio ($servicio_id)
    {
        $servicio = Servicio::with('archivos','editor','subservicios')->find($servicio_id);
        return infoJson($servicio,true);
    }
}
