<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function art()
    {
        return $this->belongsTo('App\Art');
    }
    public function author()
    {
        return $this->belongsTo('App\Author');
    }
}
