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

    public function getAnimationEpisodes($id){//json de episodios del la animacion 
        $animation = Animation::find($id);
        $response = [
            'episodes' => $animation->episodes//sabemos los episodios con la foreignKey de episodes
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }

    public function getAnimationsByAuthor($author){//metodo para obtener las animaciones de un usuario
        $animations = Animation::where('author',$author)->get();
        if(!$animations){//si no ha encontrado ningun draw
            return response()->json(['message' => 'Animations not found'],404);//json con mensaje de error 404 not found
        }
        return response()->json(['animations' => $animations],200);
    }

}
