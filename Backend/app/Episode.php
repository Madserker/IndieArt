<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    public function animation()
    {
        return $this->belongsTo('App\Animation');
    }
}
