<?php

namespace App\AuthModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\TraitAuth\ValidateTrait;
use App\AuthModel\Rol;
use App\AuthModel\Item;

class Menu extends Model
{
    use SoftDeletes;
	use ValidateTrait;

    protected $table    = 'menu';
	
	protected $fillable = ['nombre','rol_id'];
	
	protected $dates    = ['deleted_at'];

	protected $hidden   = ['created_at','updated_at','deleted_at','pivot'];

    public static $rules = [
		'nombre' => 'required|unique:menu,id|min:5|max:50',
		'rol_id' => 'required'
	];
	
	public static $messages = [
		'nombre.unique' => 'El campo :attribute es único.',
		'rol_id.unique' => 'El campo :attribute es único.'
	];
    
    public function items()
	{
		return $this->belongsToMany(Item::class);
	}

	public function rol()
	{
		return $this->belongsTo(Rol::class);
	}
}
