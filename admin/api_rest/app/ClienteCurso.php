<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use App\Traits\TraitAuth\ValidateTrait;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClienteCurso extends Authenticatable
{
    use Notifiable;  

    use SoftDeletes,ValidateTrait;

    protected $table    = 'cliente_curso';

    protected $fillable = [
        'nombres', 'apellidos', 'documento_identidad','email','password','app_token'
    ];

    protected $hidden = [
        'password',
    ];  

    public function cursos()
    {
        return $this->belongsToMany(Course::class,'cliente_curso_pivot','cliente_curso_id','curso_id');
    }
    
}
