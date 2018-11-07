<?php

namespace App\Http\Controllers;

use App\Animation;
use Illuminate\Http\Request;
use JWTAuth;


class AnimationController extends Controller
{


    public function getAnimations(){
        $animations = Animation::all();
        $response = [
            'animations' => $animations
        ];

        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }

}
