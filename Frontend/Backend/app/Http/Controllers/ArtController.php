<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Art;
use App\User;
use App\Mark;
use App\Visit;
use DB;
use JWTAuth;
use Illuminate\Support\Facades\Storage;


class ArtController extends Controller
{
    public function vote(Request $request){
        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        $user = User::find($request->input('username'));

        //si ya hemos votado la publicacion, sobreescribimos
        $mark=Mark::where('user', $request->input('username'))
        ->where('art_id', $request->input('art_id'))
        ->delete();

        

        $mark = new Mark();
        $mark->score = $request->input('score');
        $mark->art_id = $request->input('art_id');
        $mark->user = $request->input('username');
        $mark->save();
        return response()->json(['mark' => $mark], 201);//retornamos 201


         return response()->json(['message' => 'Already scored that art'],404); //si ya seguimos al usuario, lanzamos error
    }

    public function getScore($id){

        $score = $this->calculateScore($id);

        $response = [
            'score' => $score
        ];

        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }

    public function getUserScore($id,$username){
        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        
        $score=
        Mark::where('user', $username)
        ->where('art_id', $id)
        ->get()[0];

        $response = [
            'score' => $score->score
        ];

        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }

    public function calculateScore($id){

        $totalScore=0;
        $score=
        DB::table('marks')
        ->where('art_id',$id)
        ->select('marks.score')
        ->get();

        for($i=0;$i<sizeof($score);$i++){
            $totalScore=$totalScore + $score[$i]->score;
        }
        if($totalScore!=0){
            $totalScore = $totalScore/sizeof($score);
        }
        return $totalScore;
    }

    public function visit(Request $request){
        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        $user = User::find($request->input('username'));
        // if (!$user->artsVisited->contains($request->input('art_id'))) {//comprobamos que no este esta relacion ya en la tabla
                    //si ya hemos visitado la publicacion, sobreescribimos
                    $visit=Visit::where('user', $request->input('username'))
                    ->where('art_id', $request->input('art_id'))
                    ->delete();
            $visit = new Visit();
            $visit->art_id = $request->input('art_id');
            $visit->user = $request->input('username');
            $visit->save();
            return response()->json(['user' => $user], 201);//retornamos 201
        
        //return response()->json(['message' => 'Already visited that art'],201); //si ya seguimos al usuario, lanzamos error
    }

    public function getVisits($id){

        $visits=
        DB::table('visits')
        ->where('art_id',$id)
        ->get();

        $response = [
            'visits' => sizeof($visits)
        ];

        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }








    public static function getVisitsNoJson($id){

        $visits=
        DB::table('visits')
        ->where('art_id',$id)
        ->get();

        return sizeof($visits);
    }

    
    public static function getScoreNoJson($id){
        
        $totalScore=0;
        $score=
        DB::table('marks')
        ->where('art_id',$id)
        ->select('marks.score')
        ->get();

        for($i=0;$i<sizeof($score);$i++){
            $totalScore=$totalScore + $score[$i]->score;
        }
        if($totalScore!=0){
            $totalScore = $totalScore/sizeof($score);
        }
        return $totalScore;

    }

    
}
