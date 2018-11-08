<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ComicComment extends Model
{
    public function comic()
    {
        return $this->belongsTo('App\Comic');
    }
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
