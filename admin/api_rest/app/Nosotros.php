<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TraitAuth\ValidateTrait;
use App\Archivo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Nosotros extends Model
{
    use SoftDeletes;

    use ValidateTrait;
    
    protected $table    = 'nosotros';

    const FIRST_EMPRESA = 1;

    protected $fillable = ['titulo','descripcion','mision','vision','banner'];
    
    protected $dates    = ['deleted_at'];
    
    protected $hidden   = ['created_at','updated_at','deleted_at'];
    
    public static $rules = [
    'titulo'    => 'required|min:2|max:100'
    ];

    public function archivos()
    {
        return $this->morphMany(Archivo::class, 'tabla');
    }
}
