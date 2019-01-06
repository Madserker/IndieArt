<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    //Relacion OneToMany, un capitulo tiene 1..* paginas
    public function pages()
    {
        return $this->hasMany('App\Page');
    }

    public function comic()
    {
        return $this->belongsTo('App\Comic');
    }

}
