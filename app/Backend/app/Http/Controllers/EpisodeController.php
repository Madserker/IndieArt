<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Episode;
use App\Animation;
use DB;

class EpisodeController extends Controller
{

    public function deleteEpisode($id){

        if(! $userA = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        $episode = Episode::find($id);



             //importante realizar esta comprobacion en las DELETE requests
        $isCurrentUser = false;
        //cogemos el comic del capitulo
        $animation = Animation::find($episode->animation_id);

        //buscamos si el usuario esta dentro del equipo
        $users=
        DB::table('team_user')
        ->where('team_user.team',$animation->author)
        ->select('team_user.user','team_user.role','team_user.created_at','team_user.admin')
        ->get();

        for($i=0;$i<count($users);$i++){
            if($users[$i]->user == $userA->username){
                $isCurrentUser = true;
            }
        }
   


        if($userA->username == $animation->author){
            $isCurrentUser=true;
        }

        if($isCurrentUser){
            $episode->delete();
            return response()->json(['message' => 'Episode deleted'],200);
        }else{//si no es el mismo usuario que el que esta logeado, devolvemos error
            return response()->json(['message' => 'You are not the user'],404);//json con mensaje de error 404 not found
        }

    }
}
