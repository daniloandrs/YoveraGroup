<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TraitAuth\ValidateTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\{Archivo};

class GaleriaImagenes extends Model
{
    use SoftDeletes,ValidateTrait;
    
    protected $table =  'galeria_imagenes';
    protected $fillable = [
        'titulo',
        'image',
        'fecha_publicacion'
    ];

    protected $casts = [];

    public function archivos()
    {
        return $this->morphMany(Archivo::class, 'tabla');
    } 

}
