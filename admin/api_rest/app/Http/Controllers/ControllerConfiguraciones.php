<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Configuracion;
use DB;

class ControllerConfiguraciones extends Controller
{
    
    public function getConfiguraciones ()
    {
        $first = Configuracion::take(1)->first();
        return infoJson($first,true);
    }

    public function setConfiguraciones(Request $request)
    {
        try {
            DB::beginTransaction();
            
            if($request->id) {
                $configuracion = Configuracion::find($request->id);
                $configuracion->update($request->all());
            } else {
                $configuracion = Configuracion::create($request->all());
            }

            DB::commit();        
            return messageJson('Configuraciones actualizadas correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }
}  
