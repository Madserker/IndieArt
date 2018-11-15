<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DrawComment extends Model
{
    public function draw()
    {
        return $this->belongsTo('App\Draw');
    }
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
