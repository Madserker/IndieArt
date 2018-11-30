<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;


class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $primaryKey="username";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password', 'birthday', 'real_name', 'username'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    public function drawComments()
    {
        return $this->hasMany('App\DrawComment');
    }
    public function comicComments()
    {
        return $this->hasMany('App\ComicComment');
    }

    public function animationComments()
    {
        return $this->hasMany('App\AnimationComment');
    }

    public function draws()
    {
        return $this->hasMany('App\Draw');
    }
    public function comics()
    {
        return $this->hasMany('App\Comic');
    }

    public function animations()
    {
        return $this->hasMany('App\Animation');
    }


    public function artsScored(){//Many To Many relationship
        return $this->belongsToMany(Art::class, 'marks', 'user', 'art_id');
    }

    public function artsVisited(){//Many To Many relationship
        return $this->belongsToMany(Art::class, 'visits', 'user', 'art_id');
    }







    public function getJWTIdentifier()
{
    return $this->getKey(); // Eloquent Model method
}

public function getJWTCustomClaims()
{
    return [];
}
}
