<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\TraitAuth\AuthRequest;
use App\AuthModel\Session;
use App\User;
use Auth;

class ControllerAutenticate extends Controller
{
    use AuthRequest;

    public function login(Request $request) {
        if( Auth::attempt($request->all()) ) {
            $user      = Auth::user();
            $user->addHidden('roles','deleted_at');
            $dashboard = $this->getDashboard($user);
            $token     = $this->getToken($request);            
            $items     = $this->getDataItem($user);

            $data = [
                'user'     => $user,
                'menu'     => $dashboard,
                'token'    => $token,
                'rutas'    => $items,
                //'firebase'  => $firebase
            ];

            return infoAuth($data,true);

        } else {
            return messageJson("Credenciales incorrectas",false); 
        }
    }



    public function logout (Request $request) {

        Auth::logout();

        $token = $request->bearerToken();
        
        Session::where('token',$token)->delete();
        
        return messageJson("Sesión finalizada",true);
        
    }   
}
  