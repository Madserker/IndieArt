<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnimationComment extends Model
{
    public function animation()
    {
        return $this->belongsTo('App\Animation');
    }
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
