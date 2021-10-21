<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TraitAuth\ValidateTrait;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model {
    
    use SoftDeletes;
    
    use ValidateTrait;

    protected $table    = 'category';

	protected $fillable = ['name'];
    
    protected $hidden   = ['created_at','updated_at','deleted_at'];
    
    public static $rules = [
		'name'    => 'required|min:2|max:80'
	];
    

    public function courses () {
    	return $this->hasMany(Course::class);
    }
	
}
