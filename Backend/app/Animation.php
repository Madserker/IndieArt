<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Animation extends Model
{
    //Relacion OneToMany, una animacion tiene 1..* episodios
    public function Episodes()
    {
        return $this->hasMany('App\Episode');
    }
}
