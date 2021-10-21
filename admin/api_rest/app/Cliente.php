<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TraitAuth\ValidateTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
class Cliente extends Model
{
    use SoftDeletes;
    use ValidateTrait;

    protected $table    = 'clientes';

	protected $fillable = ['nombre','imagen'];
    
    protected $hidden   = ['created_at','updated_at','deleted_at'];
    
    public static $rules = [
		'nombre'    => 'required|min:2|max:100'
	];
    
}
