<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Animation extends Model
{
    //Relacion OneToMany, una animacion tiene 1..* episodios
    public function episodes()
    {
        return $this->hasMany('App\Episode');
    }
}
