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




    public function artsScored(){//Many To Many relationship
        return $this->belongsToMany(Art::class, 'marks', 'user', 'art_id');
    }

    public function artsVisited(){//Many To Many relationship
        return $this->belongsToMany(Art::class, 'visits', 'user', 'art_id');
    }

    public function teams(){//Many To Many relationship
        return $this->belongsToMany(Team::class, 'team_user', 'user', 'team');
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
