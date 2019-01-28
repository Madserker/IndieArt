<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Art;
use App\User;
use App\Mark;
use App\Visit;
use App\Tag;
use DB;
use JWTAuth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Input;


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

//TAGS========================================================
public static function addTag($art_id,$tag){
    //comprogbar si el $tag existe en la BD, si no existe retornar ERROR
    $findTags = DB::table('tags')->where('text',$tag)->get();
    if($findTags) {
        $art = Art::find($art_id);
        $art->tags()->attach($findTags[0]->id);


        $response = [
            'tags' => $findTags
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];
        return response()->json($response, 201,$headers);//retornamos 201
    }
    return 400;
}

public static function getTagsByType($type){
    $tags = DB::table('tags')->where('type',$type)->get();
    $response = [
        'tags' => $tags
    ];
    $headers = ['Content-Type' => 'application/json; charset=UTF-8',
    'charset' => 'utf-8'];
    return response()->json($response, 201,$headers);//retornamos 201
 
}

public static function getTags($art_id){
    $art = Art::find($art_id);
    $tags = $art->tags;

    $response = [
        'tags' => $tags
    ];
    $headers = ['Content-Type' => 'application/json; charset=UTF-8',
    'charset' => 'utf-8'];
    return response()->json($response, 201,$headers);//retornamos 201
}


//=============================================================


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




    // public function getArts_Filtered_Sorted_Searched_Paginated($filters,$sort,$search,$type,$page){
    public function getArts_Filtered_Sorted_Searched_Paginated(){
        // $filters = $request->input('filters');
        // $sort = $request->input('sort');
        // $search = $request->input('search');
        // $type = $request->input('type');
        // $page = $request->input('page'); //each page has 30 items

        $filters = Input::get('filters',[]);
        $type = Input::get('type',1);

        if($type==1){
            $arts = DB::table('draws')->join('arts','arts.id','=','draws.id')->get();
        }
        else if($type==2){
            $arts = DB::table('comics')->join('arts','arts.id','=','comics.id')->get();
        }
        else if($type==3){
            $arts = DB::table('animations')->join('arts','arts.id','=','animations.id')->get();
        }

        //$arts = $this->applySearch($this->sort($this->applyFilters($arts,$filters),$sort),$search);
        $arts = $this->applyFilters($arts,$filters);
        //get arts[$page * 30 , 30]

        $response = [
            'arts' => $arts
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];
        return response()->json($response, 201,$headers);//retornamos 201
    }
    
    public function applyFilters($arts,$filters){
        $filtered = [];
        $found=true;
        //si no hay ningun filtro, hacer un get de todos
        if(count($filters) == 0){
            return $arts;
        }
        else{
          for($i=0;$i<count($arts);$i++){//draw
            $found=false;
            $tags = $this->getTags($arts[$i]->id)->tags;
            for($e=0;$e<count($tags);$e++){
                if(in_array($tags[$e],$filters) && !$found){
                    array_push($filtered,$arts[$i]);
                    $found = true;
                }
            }
          }
        }
    }
}
