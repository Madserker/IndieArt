<?php

namespace App\Http\Controllers;

use App\Animation;
use App\Episode;
use Illuminate\Http\Request;
use JWTAuth;
use Illuminate\Support\Facades\Storage;


class AnimationController extends Controller
{


    public function postAnimation(Request $request){
        //confirmamos que este metodo solo se pueda ejecutar si el usuario esta logueado
        

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        //$user = JWTAuth::parseToken()->toUser(); //Retorna el usuario del token

        $animation = new Animation();

        $file = $request->file('photo');//Cogemos el file de la request

        $path = Storage::putfile('animations', $file);//cogemos el path con el nombre del file que laravel ha creado automaticamente

        $animation->imagePath = "Backend/storage/app/".$path;//le pasamos este path a la base de datos

        //rellenamos el resto de datos con la request
        $animation->name = $request->input('name');
        $animation->author = $request->input('author');
        $animation->synopsis = $request->input('synopsis');

        //default values        
        $animation->mark = 0;
        $animation->visits = 0;
        $animation->status = "Aired";

        $animation->save();//guardamos el draw
        return response()->json(['animation' => $animation], 201);//retornamos 201 y el dibujo
    }

    public function postEpisode(Request $request){
        //confirmamos que este metodo solo se pueda ejecutar si el usuario esta logueado
        

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        //$user = JWTAuth::parseToken()->toUser(); //Retorna el usuario del token

        $episode = new Episode();

        $file = $request->file('video');//Cogemos el file de la request

        $path = Storage::putfile('animations/episodes', $file);//cogemos el path con el nombre del file que laravel ha creado automaticamente

        $episode->videoPath = "Backend/storage/app/".$path;//le pasamos este path a la base de datos

        //rellenamos el resto de datos con la request
        $episode->name = $request->input('name');
        $episode->number = $request->input('number');
        $episode->animation_id = $request->input('animation_id');


        $episode->save();//guardamos el draw
        return response()->json(['episode' => $episode], 201);//retornamos 201 y el dibujo
    }



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

    public function getAnimationById($id){
        $animation = Animation::find($id);
        if(!$animation){//si no ha encontrado el draw con ese id
            return response()->json(['message' => 'Animation not found'],404);//json con mensaje de error 404 not found
        }
        return response()->json(['animation' => $animation],200);
    }

    public function deleteAnimation($id){

        if(! $userA = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        $animation = Animation::find($id);
        //importante realizar esta comprobacion en las DELETE requests
        if($userA->username != $animation->author){//si no es el mismo usuario que el que esta logeado, devolvemos error
            return response()->json(['message' => 'You are not the user'],404);//json con mensaje de error 404 not found
        }
        $animation->delete();
        return response()->json(['message' => 'Animation deleted'],200);
    }
}
