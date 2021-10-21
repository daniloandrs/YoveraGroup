<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TraitAuth\ValidateTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Archivo;

class TemaryCourse extends Model {
    
    use SoftDeletes,ValidateTrait;

    protected $table = 'temary_course';

    protected $fillable = [
        'title',
        'url_video',
        'description',
        'duration',
        'temary_id',
        'numeration',
        'enabled'
    ];
    
    protected $dates    = ['deleted_at'];
    
    protected $hidden   = ['created_at','updated_at','deleted_at'];
    
    public static $rules = [
        'title'    => 'required|min:2|max:1500'
    ];

    public function temary() {
    	return $this->belongsTo(Temary::class);
    }

    public function archivos ()
    {
        return $this->morphMany(Archivo::class, 'tabla');
    }

}
