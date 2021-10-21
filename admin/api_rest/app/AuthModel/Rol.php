<?php

namespace App\AuthModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\TraitAuth\ValidateTrait;

class Rol extends Model
{
    use SoftDeletes;
	use ValidateTrait;

    protected $table    = 'rol';
	
	protected $fillable = ['key','nombre','descripcion','nivel'];

	protected $dates    = ['deleted_at'];
	
	protected $hidden   = ['deleted_at','pivot'];

    public static $rules = 
    [
		'key'   =>'required|unique:rol|alpha|max:20|min:3',
		'nombre'=>'required|unique:rol|max:50|min:5',
		'nivel' =>'required|integer|min:1|max:10'
    ];
    
    public function users()
	{
		return $this->belongsToMany(User::class);
	}

	public function menu()
	{
		return $this->hasOne(Menu::class);
	}
    
}
