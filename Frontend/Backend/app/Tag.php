<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function draws()//Many To Many Relation
    {
        return $this->belongsToMany('App\Draw');
    }

    public function comics()//Many To Many Relation
    {
        return $this->belongsToMany('App\Comic');
    }

    public function animations()//Many To Many Relation
    {
        return $this->belongsToMany('App\Animation');
    }

}
