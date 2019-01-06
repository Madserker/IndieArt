<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public $timestamps = false;

    public function art()//Many To Many Relation
    {
        return $this->belongsToMany('App\Art');
    }


}
