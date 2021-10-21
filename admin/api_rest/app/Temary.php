<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Traits\TraitAuth\ValidateTrait;

use Illuminate\Database\Eloquent\SoftDeletes;

class Temary extends Model {
    
    use SoftDeletes;

    use ValidateTrait;

    protected $table = 'temary';

    protected $fillable = [
        'title',
        'description',
        'course_id',
        'numeration',
        'enabled',
    ];
    
    protected $dates    = ['deleted_at'];
    
    protected $hidden   = ['created_at','updated_at','deleted_at'];
    
    public static $rules = [
        'name'    => 'required|min:2|max:1500'
    ];

    public function temary_courses() {
    	return $this->hasMany(TemaryCourse::class);
    }


    public function course() {
    	return $this->belongsTo(Course::class);
    }
    
}
