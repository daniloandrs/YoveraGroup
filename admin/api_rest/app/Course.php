<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Traits\TraitAuth\ValidateTrait;

use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model {

    use SoftDeletes;

    use ValidateTrait;
    
    protected $table    = 'course';

    protected $fillable = [
        'name',
        'url_course',
        'background_image',
        'description',
        'level_id',
        'category_id',
        'type_course_id',
        'teacher_id',
        'release_date',
        'duration',
        'presentation_video',
        'about',
        'course_token',
        'precio'
    ];
    
    protected $casts = [
        'precio' => 'float'
    ];

    protected $dates    = ['deleted_at'];
    
    protected $hidden   = ['created_at','updated_at','deleted_at'];
    
    public function category() {
    	return $this->belongsTo(Category::class);
    }

    public function level() {
    	return $this->belongsTo(Level::class);
    }

    public function type_course() {
    	return $this->belongsTo(TypeCourse::class);
    }

    public function teacher() {
    	return $this->belongsTo(Teacher::class);
    }

    public function temario () {
    	return $this->hasMany(Temary::class);
    }

    public function clientes()
    {
        return $this->belongsToMany(ClienteCurso::class,'cliente_curso_pivot','curso_id','cliente_curso_id');
    }

    public static $rules = [

        'name'    => 'required|min:2|max:80',
        
        'course_token' => 'required|unique:course'
    
    ];

}
