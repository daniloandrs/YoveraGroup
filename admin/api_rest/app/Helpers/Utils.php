<?php

use Carbon\Carbon;

use Illuminate\Support\Str;

function saveFile($file,$carpeta_name)  {
    $extension  = $file->extension();
    $today      = Carbon::now()->format('dmyhi');
    $fullName   = $file->getClientOriginalName(); 
    $name       = explode('.',$fullName)[0];
    $url        = $file->storeAs($carpeta_name,$name.$today.'.'.$extension);
    return $url;
} 
 

function saveFilePolymorphic($file,$carpeta_name)  {
    $extension  = $file->extension();
    $today      = Carbon::now()->format('dmyhi');
    $fullName   = $file->getClientOriginalName(); 
    $name       = explode('.',$fullName)[0];
    $url        = $file->storeAs($carpeta_name, $name.'-'.$today.'.'.$extension);
    return $name.'-'.$today.'.'.$extension;
} 

function randomToken () { 
    return Str::random(32);
}

function nowDate() {
    return Carbon::now();
}

function Parse ($data) {
    $tmp = [];
    foreach ($data as $key => $value) {
        $tmp[$key] = $data[$key] == "null" ? null : $data[$key];
    }
    return $tmp;
}

function inputDateToString($str) {
    $mnths = [
        'Jan' => '01',
        'Feb' => '02',
        'Mar' => '03',
        'Apr' => '04',
        'May' => '05',
        'Jun' => '06',
        'Jul' => '07',
        'Aug' => '08',
        'Sep' => '09',
        'Oct' => '10',
        'Nov' => '11',
        'Dec' => '12'
    ];
    $date = explode(" ",$str);  
    return implode('-',[$date[3], $mnths[$date[1]],  $date[2]]);
}

function getVideoDuration($video_path) {
    $getID3 = new \getID3;
    $file = $getID3->analyze($video_path);
    $playtime_string = $file['playtime_string'];
    return $playtime_string;
}