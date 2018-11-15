<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Draw extends Art
{

    public function comments()
    {
        return $this->hasMany('App\DrawComment');
    }

    public function tags()//Many To Many Relation
    {
        return $this->belongsToMany('App\Tag');
    }
    
}
