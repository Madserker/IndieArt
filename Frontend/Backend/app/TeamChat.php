<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TeamChat extends Chat
{
    protected $fillable = [
        'team'
    ];
}
