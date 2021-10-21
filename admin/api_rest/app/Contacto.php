<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TraitAuth\ValidateTrait;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contacto extends Model
{
    use SoftDeletes,ValidateTrait;

    protected $table    = 'form_contacto';

	protected $fillable = ['nombre','email','telefono','asunto','mensaje','isLeido'];
    
    protected $hidden   = ['created_at','updated_at','deleted_at'];
    
    protected $casts = [
        'isLeido' => 'boolean'
    ];

    public static $rules = [ 
		'nombre'    => 'required|min:2|max:80'
	];
    


}
