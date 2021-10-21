<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Traits\TraitAuth\ValidateTrait;

use Illuminate\Database\Eloquent\SoftDeletes;

class Level extends Model {
    
    use SoftDeletes;
    
    use ValidateTrait;

    protected $table    = 'level';

    protected $fillable = ['name'];
    
    protected $dates    = ['deleted_at'];
    
    protected $hidden = ['created_at','updated_at','deleted_at'];
    
    public static $rules = [
    'name'    => 'required|min:2|max:80'
    ];
    
    public function courses () {
    	return $this->hasMany(Course::class);
    }
    
} 
  