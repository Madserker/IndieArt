<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comic extends Model
{
    //Relacion OneToMany, un comic tiene 1..* capitulos
    public function chapters()
    {
        return $this->hasMany('App\Chapter');
    }
}
