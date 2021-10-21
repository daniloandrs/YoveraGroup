<?php

namespace App\AuthModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class ItemMenu extends Model
{
    use SoftDeletes;

	protected $table    = 'item_opcion';
	protected $fillable = ['opcion_id','item_id','visible'];
	protected $dates    = ['deleted_at'];
	protected $hidden   = ['created_at','updated_at','deleted_at'];
	
	
	public static $cast = [
		'visible' => 'boolean'
	];

    public static $rules = [
		'opcion_id' => 'required',
		'item_id'   => 'required'
	];

	
}
