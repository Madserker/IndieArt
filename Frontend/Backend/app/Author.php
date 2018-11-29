<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{

    protected $primaryKey="username";

    protected $fillable = [
        'profile_picture', 'username', 'description'
    ];

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    public function arts()
    {
        return $this->hasMany('App\Art');
    }

    public function followers(){//Many To Many relationship
        return $this->belongsToMany(Author::class, 'users_users', 'author_id', 'follower_id');
    }
    public function following(){//Many To Many relationship
        return $this->belongsToMany(Author::class, 'users_users', 'follower_id', 'author_id');
    }
}
