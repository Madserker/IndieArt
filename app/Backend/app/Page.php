<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    public function chapter()
    {
        return $this->belongsTo('App\Chapter');
    }
}
