<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contacto;

class ControllerPageContacto extends Controller
{
    public function create(Request $request)
    {
        $contacto = Contacto::create($request->all());

        return messageJson('Información enviada correctamente, nos comunicaremos con usted a la brevedad.',true);
    }
}
