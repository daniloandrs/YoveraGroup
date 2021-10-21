<?php

namespace App\AuthModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\AuthModel\Rol;

class Accion extends Model {

    use SoftDeletes;

    protected $table = 'accion';
	protected $fillable = ['nombre'];
	protected $dates = ['deleted_at'];
	protected $hidden = ['created_at','updated_at','deleted_at'];
    
    public static $rules = [
		'nombre'    => 'required|min:2|max:80'
	];

	public function roles() {

		return $this->belongsToMany(Rol::class);
	}

}
