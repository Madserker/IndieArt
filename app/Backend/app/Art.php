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
    public function comments(){
        return $this->hasMany('App\Comment');
    }

    public function usersScored(){//Many To Many relationship
        return $this->belongsToMany(User::class, 'marks', 'art_id', 'user');
    }

    public function usersVisited(){//Many To Many relationship
        return $this->belongsToMany(User::class, 'visits', 'art_id', 'user');
    }

}
