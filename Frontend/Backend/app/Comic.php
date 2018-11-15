<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comic extends Art
{
    //Relacion OneToMany, un comic tiene 1..* capitulos
    public function chapters()
    {
        return $this->hasMany('App\Chapter');
    }
    public function comments()
    {
        return $this->hasMany('App\ComicComment');
    }
    public function tags()//Many To Many Relation
    {
        return $this->belongsToMany('App\Tag');
    }
}
