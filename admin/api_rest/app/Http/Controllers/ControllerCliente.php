<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cliente;
use DB; 
class ControllerCliente extends Controller
{
    public function get()   
    {
        $clientes = Cliente::all();
        return infoJson($clientes,true); 
    }


    public function create(Request $request)
    {
        try{
            DB::beginTransaction(); 
            $cliente = Cliente::create($request->only(['nombre']));
            if ($request->hasFile('image')) {
                $image      = $request->file('image');
                $extension  = $image->extension();
                $url        = saveFile($image,'clientes');
                $cliente->imagen = $url;
                $cliente->update();
            }
            
            DB::commit();
            return messageJson('Cliente creado correctamente',true);
        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
        
    }


    public function edit(Request $request)
    {
        try{
            DB::beginTransaction(); 

            $cliente = Cliente::find($request->id);
            if ($request->hasFile('image')) {                
                \Storage::delete($cliente->imagen);
                $image      = $request->file('image');
                $url        = saveFile($image,'clientes');
                $cliente->imagen = $url;
            }
            $cliente->nombre = $request->nombre;
            $cliente->update();

            DB::commit();

            return messageJson('Cliente actualizado correctamente',true);

        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
        
    }
    

    public function delete($id)
    {
        try{
            DB::beginTransaction(); 
            $cliente = Cliente::find($id);
            $cliente->delete();
            DB::commit();
            return messageJson('Cliente eliminado correctamente',true);
        } catch (\Exception $e) {
            DB::rollBack();
            return messageJson($e->getMessage(),false);
        }
        
    }

}
  