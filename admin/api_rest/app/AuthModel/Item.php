<?php

namespace App\AuthModel;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TraitAuth\ValidateTrait;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
	use SoftDeletes;
	use ValidateTrait;

	protected $table = 'item';
	
	protected $fillable = ['nombre','url','opcion_id'];
	
	protected $hidden 	= ['created_at','updated_at','deleted_at'];
    
    public static $rules = [
		'nombre'    => 'required|min:4|max:80',
		'url'       => 'required|min:4|max:60|unique:item'
	];

	public function opcion () {

		return $this->belongsTo(Opcion::class);
	
	}
	
	public function menus () {

		return $this->belongsToMany(Menu::class);
	
	}
}
