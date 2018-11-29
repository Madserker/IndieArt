<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $primaryKey="username";

    public function users(){//Many To Many relationship
        return $this->hasMany(User::class, 'team_user', 'team_id', 'user_id');
    }
}
