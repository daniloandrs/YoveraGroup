<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Archivo extends Model
{
    use SoftDeletes;
    protected $table = 'archivo';

    protected $fillable = [
        'directorio',
        'url',
        'tipo_medio',
        'tipo_archivo',
    ];

    public function tabla()
    {
        return $this->morphTo();
    }
}
