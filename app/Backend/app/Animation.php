<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Animation extends Art
{
    public $timestamps = false;
    //Relacion OneToMany, una animacion tiene 1..* episodios
    public function episodes()
    {
        return $this->hasMany('App\Episode');
    }
    public function comments()
    {
        return $this->hasMany('App\AnimationComment');
    }

}
