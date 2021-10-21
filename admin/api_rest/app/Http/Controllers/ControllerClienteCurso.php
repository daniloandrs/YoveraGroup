<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\ClienteCurso;
use App\Course;
use Carbon\Carbon;

class ControllerClienteCurso extends Controller
{
    public function create(Request $request)
    {  
        try {
            DB::beginTransaction();

            $userSearch = ClienteCurso::where('email','=',$request->email)->first();
            if(isset($userSearch))
                return messageJson('Este email ya esta registrado en la plataforma.',false);
            
            $userSearch = ClienteCurso::where('documento_identidad','=',$request->documento_identidad)->first();
            if(isset($userSearch))
                return messageJson('Este documento de identidad ya esta registrado en la plataforma.',false);

            $data = [
                'nombres' => $request->nombres,
                'apellidos' => $request->apellidos,
                'documento_identidad' => $request->documento_identidad,
                'email' => $request->email,
                'password' => bcrypt($request->documento_identidad),
                'app_token' => bcrypt($request->documento_identidad.'app_token'),
            ];
            $cliente = ClienteCurso::create($data);
            DB::commit();        
            return messageJson('Cliente registrado correctamente,copia sus credenciales para acceder al sitio.',true);
        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }
     
    
    public function update(Request $request)
    {  
        try {
            DB::beginTransaction();

            $userSearch = ClienteCurso::where('id','!=',$request->id)->where('email','=',$request->email)->first();
            if(isset($userSearch))
                return messageJson('Este email ya esta registrado en la plataforma.',false);
            
            $userSearch = ClienteCurso::where('id','!=',$request->id)->where('documento_identidad','=',$request->documento_identidad)->first();
            if(isset($userSearch))
                return messageJson('Este documento de identidad ya esta registrado en la plataforma.',false);

            $user = ClienteCurso::find($request->id);
            $data = [
                'nombres' => $request->nombres,
                'apellidos' => $request->apellidos,
                'documento_identidad' => $request->documento_identidad,
                'email' => $request->email,
                'password' => bcrypt($request->documento_identidad),
                'app_token' => bcrypt($request->documento_identidad.'app_token'),
            ];
            $user->update($data);
            DB::commit();        
            return messageJson('Cliente actualizado correctamente',true);
        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }

    public function delete($user_id)
    {  
        try {
            DB::beginTransaction();

            $userSearch = ClienteCurso::find($user_id);

            if(!isset($userSearch))
                return messageJson('Este usuario ya ha sido eliminado',false);

            $userSearch->delete();
            DB::commit();        
            return messageJson('Cliente actualizado correctamente',true);
        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }


    public function getMisCursos($user_id)
    {  
        try {

            $user = ClienteCurso::find($user_id);
            
            $misCursos =  $user->cursos;

            $idsCursos = $misCursos->pluck('id')->toArray();

            $cursos = Course::whereNotIn('id',$idsCursos)->get();
            
            $data = [
                'misCursos' =>$misCursos,
                'cursosSinAsignar' => $cursos
            ];

            return infoJson($data,true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }
    

    public function addMisCursos (Request $request)
    {
        try {
            DB::beginTransaction();

            $user = ClienteCurso::find($request->cliente_id);
            $user->cursos()->attach($request->curso_id);
            DB::commit();        
            return messageJson('Curso asignado correctamente',true);
        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
    }
}
