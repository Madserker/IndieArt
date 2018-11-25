<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function art()//Many To Many Relation
    {
        return $this->hasMany('App\Art');
    }


}
