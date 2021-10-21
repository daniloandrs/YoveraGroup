<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TraitAuth\ValidateTrait;
use Illuminate\Database\Eloquent\SoftDeletes;

class Configuracion extends Model
{
    use SoftDeletes,ValidateTrait;

    protected $table    = 'configuracion';

    protected $fillable = [
        'form_contacto_titulo',
        'form_contacto_descripcion',
        'form_contacto_direccion',
        'form_contacto_email',
        'form_contacto_email_2',
        'form_contacto_email_3',
        'form_contacto_telefono',
        'form_contacto_telefono_2',
        'form_contacto_telefono_3',
        'telefono_whatsapp',
        'dias_atencion',
        'horas_atencion',
        'dias_atencion_2',
        'horas_atencion_2'
    ];
    
    protected $hidden   = ['created_at','updated_at','deleted_at'];
    
    protected $casts = [];

    public static $rules = [ 
		'nombre'    => 'required|min:2|max:80'
	];
    


}
