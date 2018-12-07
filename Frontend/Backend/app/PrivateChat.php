<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PrivateChat extends Model
{
    public $timestamps = false;
    protected $fillable=[
        'user'
    ];
}
