<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\AuthModel\Rol;
use App\AuthModel\Menu;
use App\AuthModel\Session;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password','avatar','nombres'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function roles()
    {
        return $this->belongsToMany(Rol::class);
    }

    public function sesiones()
    {
        return $this->hasMany(Session::class);
    }
}
