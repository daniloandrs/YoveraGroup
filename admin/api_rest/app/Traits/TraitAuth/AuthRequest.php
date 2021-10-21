<?php

namespace App\Traits\TraitAuth;
use Auth;
use App\AuthModel\Item;
use App\AuthModel\Session;
use Carbon\Carbon;
use App\AuthModel\Opcion;

trait AuthRequest
{
	public function getDashboard($user) {
		
		$min = $user->roles()->min('nivel');
		
		$rol = $user->roles()->where('nivel',$min)->first();

		$menu = $rol->menu;

		$ids_opciones = [];
		
		$all_items = [];
		
		foreach ($user->roles as $rol) {
		
			$items = $rol->menu->items;
		
			foreach ($items as $item) {
				$ids_opciones[] = $item->opcion_id;
				$all_items[] = $item->id;
			}
		}
		
		$items_assigned = Item::whereIn('id',$all_items)->get();
		
		$opciones = Opcion::whereIn('id',$ids_opciones)->get();
		
		foreach ($opciones as $opcion){
		
			$items = [];
		
			foreach ($items_assigned as $item) {
		
				if($item->opcion_id == $opcion->id){
		
					$items[] = $item;
		
				}
		
			}  
		
			$opcion['items'] = $items;
		}
		
		$menu['opciones'] = $opciones;
		
		$menu->addHidden('items');
		
		$user->addHidden('roles');
		
		return $menu;
	}


	public function getDataItem($usuario){
		$items = [];
		
		$roles = $usuario->roles;
		
		foreach ($roles as $rol) {
		
			$menu = $rol->menu;
		
			foreach ($rol->menu->items as $item) {
		
				$item->addVisible('nombre','url');
		
				$items[] = $item;
		
			}
	
		}
	
		return $items;
	}

	public function getToken($request) {

		$user = Auth::user();
		
		$date = Carbon::now()->format('Y-m-d H:i:s');
		
		$new_token = bcrypt($user->name.$date);
		
		$token = Session::create([
				'token' => $new_token,
				'user_id' => $user->id,
				'ip' => $request->ip(),
				'dispositivo' => gethostbyaddr($request->ip())
			]);
		
			return $new_token;
	}
 
	public function getRol($user)
	{
		$roles = $user->roles;
		$roles->addHidden('roles','menu');
		return $roles;
	}

	public function getAcciones($user)
	{
		return $user->rol->acciones;
	}
	 
	public function getFirebaseApi () {
		$firebase = [];
		$firebase['api_key'] 		=  config('services.firebase.api_key');
		$firebase['auth_domain']  	=  config('services.firebase.auth_domain');
		$firebase['database_url'] 	=  config('services.firebase.database_url');
		$firebase['storage_bucket'] =  config('services.firebase.storage_bucket');

		return $firebase;
	}
} 