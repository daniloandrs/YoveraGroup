<?php
namespace App\Http\Controllers\System;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use App\User;

class ControllerUser extends Controller {

    public function registerUser(Request $request)
    {
        try {  
            DB::beginTransaction();
            $userExiste = User::where('name','=',$request->nick)->first();
            if($userExiste)
                return  messageJson('Este nombre de usuario ya existe.',false);
        
            $user = User::create([
                'name' => $request->nick,
                'nombres' => $request->nombres,
                'password' => bcrypt($request->password),
                'email'     => $request->email,
            ]);

            $user->roles()->attach($request->rol_id);

            DB::commit();
            return  messageJson('Usuario registrado correctamente.',true);
        }catch(\Exception $e){
            return  messageJson($e->getMessage(),false);
        }
    }  

    public function updateUser(Request $request)
    {
        try {  
            DB::beginTransaction();
            $userExiste = User::where('id','!=',$request->id)->where('name','=',$request->name)->first();
            if($userExiste)
                return  messageJson('Este nombre de usuario ya existe.',false);
            
            $user = User::find($request->id);

            $user->update([
                'name' => $request->name,
                'nombres' => $request->nombres,
                'email'     => $request->email,
            ]);

            $user->roles()->sync([$request->rol_id]);

            DB::commit();
            return  messageJson('Usuario actualizado correctamente.',true);
        }catch(\Exception $e){
            return  messageJson($e->getMessage(),false);
        }
    }

    public function updatePassword(Request $request)
    {
        try {  
            DB::beginTransaction();
            $user = User::find($request->id);
            $user->update([
                'password' =>  bcrypt($request->password)
            ]);
            DB::commit();
            return  messageJson('Contraseña actualizada correctamente.',true);
        }catch(\Exception $e){
            return  messageJson($e->getMessage(),false);
        }
    }
}