<?php

namespace App\AuthModel;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TraitAuth\ValidateTrait;
use App\AuthModel\Item;
use Illuminate\Database\Eloquent\SoftDeletes;

class Opcion extends Model
{
	use SoftDeletes;
	use ValidateTrait;

    protected $table    = 'opcion';
	protected $fillable = ['nombre','icono'];
	protected $dates    = ['deleted_at'];
	protected $hidden   = ['created_at','updated_at','deleted_at'];
	
    public  static $rules = [
		'nombre'    => 'min:4|max:20|required|unique:opcion',
		'icono'     => 'min:3|max:20'
	];


	public function items()
	{
		return $this->hasMany(Item::class);
	}
	
}
