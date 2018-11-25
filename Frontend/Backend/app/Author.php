<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    public function arts()
    {
        return $this->hasMany('App\Art');
    }
}
