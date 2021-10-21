<?php

namespace App\AuthModel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Session extends Model
{
    use SoftDeletes;

    protected $table    = 'session';
	protected $fillable = ['token','dispositivo','ip','user_id'];
	protected $dates    = ['deleted_at'];
	protected $hidden   = ['created_at','updated_at','deleted_at'];

    public static $rules = 
    [
		'key'   =>'required|unique:rol|alpha|max:20|min:3',
		'nombre'=>'required|unique:rol|max:50|min:5',
		'nivel' =>'required|integer|min:1|max:10'
    ];

    public function menu()
	{
		return $this->hasOne(Menu::class);
    }

    public function acciones()
	{
		return $this->belongsToMany(Accion::class);
	}

	public function user(){
        return $this->belongsTo(User::class);
    }
}
