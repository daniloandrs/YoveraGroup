<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SubServicio;

class ControllerPageSubServices extends Controller
{
    public function getSubServices($service_id)
    {
        $query = SubServicio::query();
        
        $query->with('archivos');

        if($service_id === 'tab_1') {
            $subServices = $query->get();
        } else {
            $subServices = $query->where('servicio_id','=',$service_id)->get();
        }
        
        return infoJson($subServices,true);
    }
}
