<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    public function art(){//Many To Many relationship
        return $this->belongsTo('App\Art');
    }
    public function user(){//Many To Many relationship
        return $this->belongsTo('App\User');
    }
}
