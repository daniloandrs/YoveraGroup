<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Hash;
use App\ClienteCurso;

class ControllerLogin extends Controller
{
    public function login(Request $request)
    {

        $usuario = ClienteCurso::where('email', '=', $request->email)->first();

        if (is_null($usuario))
            return messageJson("Credenciales incorrectas",false);

        if (Hash::check($request->password, $usuario->password) == false)
            return messageJson("Credenciales incorrectas",false);
        $usuario->makeHidden(['documento_identidad','created_at','deleted_at','id']);
        return infoJson($usuario,true);
    }
}
  