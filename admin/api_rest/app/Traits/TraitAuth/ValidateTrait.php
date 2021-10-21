<?php

namespace App\Traits\TraitAuth;

trait ValidateTrait
{
    
    public $errors;

    public function validate($data) {
        $Reflection = new \ReflectionClass(__CLASS__);
        $ReflectionClass = $Reflection->newInstance();
        if(empty($ReflectionClass->rules)) return true;
        
        $v = !empty($ReflectionClass->messages) ? \Validator::make($data, $ReflectionClass->rules,$ReflectionClass->messages) :\Validator::make($data, $ReflectionClass->rules);
        
        if($v->fails()) {
            $this->errors = $v->errors()->getMessages();
            return false;
        }

        return true;
    }

    public function validationErrors() {
        return $this->errors;
    }
    
}