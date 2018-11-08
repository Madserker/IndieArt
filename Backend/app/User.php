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


    public $incrementing = false;
    protected $primarykey = 'username';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password', 'ImagePath'
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



    public function getJWTIdentifier()
{
    return $this->getKey(); // Eloquent Model method
}

public function getJWTCustomClaims()
{
    return [];
}
}
