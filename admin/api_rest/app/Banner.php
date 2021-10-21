<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Traits\TraitAuth\ValidateTrait;

use Illuminate\Database\Eloquent\SoftDeletes;

class Banner extends Model {
    
    use SoftDeletes;

    use ValidateTrait;

    protected $table    = 'banner';

    protected $fillable = [

        'banner_image',        
            
        'title',
        
        'description',
        
        'order',
        
        'enabled',
        
        'button_title',
        
        'redirect_to'
    
    ];
    
    protected $hidden   = ['created_at','updated_at','deleted_at'];
    
    public static $rules = [
		'title'    => 'required|min:2|max:80'
	];
    
}
