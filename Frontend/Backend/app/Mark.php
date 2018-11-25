<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mark extends Model
{
    public function user(){
        return $this->belongsTo('App\User');
    }
    public function art(){
        return $this->belongsTo('App\Art');
    }
}
