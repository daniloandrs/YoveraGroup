<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TraitAuth\ValidateTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\{Archivo,Editor};

class Servicio extends Model
{
    use SoftDeletes,ValidateTrait;

    protected $table    = 'servicio';

    protected $fillable = ['nombre','icono','descripcion'];
    
    protected $dates    = ['deleted_at'];
    
    protected $hidden   = ['created_at','updated_at','deleted_at'];
    
    public static $rules = [
    'nombre'    => 'required|min:3|max:80'
    ];

    public function archivos()
    {
        return $this->morphMany(Archivo::class, 'tabla');
    }

    public function editor()
    {
        return $this->morphOne(Editor::class, 'tabla');
    }

    public function subservicios()
    {
        return $this->hasMany(SubServicio::class);
    }
     
}
 