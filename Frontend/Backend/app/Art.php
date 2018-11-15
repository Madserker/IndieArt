<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Art extends Model
{
    public function tags()//Many To Many Relation
    {
        return $this->belongsToMany('App\Tag');
    }
    public function user()//Many To One Relation
    {
        return $this->belongsTo('App\User');
    }

}
