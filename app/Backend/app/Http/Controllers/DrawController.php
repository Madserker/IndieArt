<?php

namespace App\Http\Controllers;

use App\Draw;
use App\Art;
use DB;
use Illuminate\Http\Request;
use JWTAuth;
use Illuminate\Support\Facades\Storage;


class DrawVisits{
    public $draw;
    public $visits;

    function __construct($draw, $visits) {
        $this->draw = $draw;
        $this->visits = $visits;
    }
}

class DrawScore{
    public $draw;
    public $score;

    function __construct($draw, $score) {
        $this->draw = $draw;
        $this->score = $score;
    }
}


class DrawController extends Controller
{

    public function postDraw(Request $request){
        //confirmamos que este metodo solo se pueda ejecutar si el usuario esta logueado
        

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        //$user = JWTAuth::parseToken()->toUser(); //Retorna el usuario del token
        $art = new Art();

        $file = $request->file('photo');//Cogemos el file de la request

        $path = Storage::putfile('draws', $file);//cogemos el path con el nombre del file que laravel ha creado automaticamente

        $art->image_path = "Backend/storage/app/".$path;//le pasamos este path a la base de datos

        //rellenamos el resto de datos con la request
        $art->name = $request->input('name');
        $art->author = $request->input('author');
        $art->descripcion = $request->input('descripcion');
        $art->save();

        $draw = new Draw();
        $draw->id = $art->id;
        //default values        

        $draw->save();//guardamos el draw
        return response()->json([$draw->id], 201);//retornamos 201 y el id
    }

    public function getDraws(){
        $draws = 
        DB::table('arts')
        ->join('draws', 'arts.id', '=', 'draws.id')
        ->select('arts.*','draws.*')
        ->get();
        $response = [
            'draws' => $draws
        ];

        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }



    public function getDrawById($id){
        $draw = 
        DB::table('arts')
        ->where('arts.id', $id)
        ->join('draws', 'arts.id', '=', 'draws.id')
        ->select('arts.*','draws.*')
        ->get();
        if(!$draw){//si no ha encontrado el draw con ese id
            return response()->json(['message' => 'Draw not found'],404);//json con mensaje de error 404 not found
        }
        return response()->json(['draw' => $draw[0]],200);
        
    }

    public function getDrawsByAuthor($author){//metodo para obtener los dibujos de un usuario
        $draws = 
        DB::table('arts')
        ->where('arts.author', $author)
        ->join('draws', 'arts.id', '=', 'draws.id')
        ->select('arts.*','draws.*')
        ->get();
        if(!$draws){//si no ha encontrado ningun draw
            return response()->json(['message' => 'Draws not found'],404);//json con mensaje de error 404 not found
        }
        return response()->json(['draws' => $draws],200);
    }

    public function putDraw(Request $request, $id){//actualizar draw atributes

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $draw = Draw::find($id);
        if(!$draw){//si no ha encontrado el draw con ese id
            return response()->json(['message' => 'Draw not found'],404);//json con mensaje de error 404 not found
        }
        $draw->name = $request->input('name');
        $draw->save();
        return response()->json(['draw' => $draw],200);
    }

    public function deleteDraw($id){

        if(! $userA = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        $draw = Draw::find($id);
        $art = Art::find($id);


             //importante realizar esta comprobacion en las DELETE requests
        $isCurrentUser = false;


 //buscamos si el usuario esta dentro del equipo
 $users=
 DB::table('team_user')
 ->where('team_user.team',$userA->username)
 ->select('team_user.user','team_user.role','team_user.created_at','team_user.admin')
 ->get();

 for($i=0;$i<count($users);$i++){
     if($users[$i]->user == $userA->username){
         $isCurrentUser = true;
     }
 }
   
        if($userA->username != $art->author){
            $isCurrentUser=true;
        }

        if($isCurrentUser){
            $draw->delete();
            $art->delete();
    
            return response()->json(['message' => 'Draw deleted'],200);
        }else{//si no es el mismo usuario que el que esta logeado, devolvemos error
            return response()->json(['message' => 'You are not the user'],404);//json con mensaje de error 404 not found
        }

    }










    
//ORDERBY==========================================================================

function cmpVisits($a,$b)
{
    if ($a->visits == $b->visits) {
        return 0;
    }
    return ($a->visits < $b->visits) ? 1 : -1;
}

function cmpScore($a,$b)
{
    if ($a->score == $b->score) {
        return 0;
    }
    return ($a->score < $b->score) ? 1 : -1;
}

public function getDrawsOrderByVisits(){
    $draws = 
    DB::table('arts')
    ->join('draws', 'arts.id', '=', 'draws.id')
    ->select('arts.*','draws.*')
    ->get();

    $drawsOrdered = [];
    $drawsOrderedJson = [];

    for($i=0;$i<sizeof($draws);$i++){
        array_push($drawsOrdered, new DrawVisits($draws[$i],ArtController::getVisitsNoJson($draws[$i]->id)));
    }

    usort($drawsOrdered, array($this, "cmpVisits"));

    for($i=0;$i<sizeof($drawsOrdered);$i++){
        array_push($drawsOrderedJson, $drawsOrdered[$i]->draw);
    }

    $response = [
        'draws' => $drawsOrderedJson
    ];

    $headers = ['Content-Type' => 'application/json; charset=UTF-8',
    'charset' => 'utf-8'];

    return response()->json($response, 200, $headers);
}

public function getDrawsOrderByScore(){
    $draws = 
    DB::table('arts')
    ->join('draws', 'arts.id', '=', 'draws.id')
    ->select('arts.*','draws.*')
    ->get();

    $drawsOrdered = [];
    $drawsOrderedJson = [];

    for($i=0;$i<sizeof($draws);$i++){
        array_push($drawsOrdered, new DrawScore($draws[$i],ArtController::getScoreNoJson($draws[$i]->id)));
    }

    usort($drawsOrdered, array($this, "cmpScore"));

    for($i=0;$i<sizeof($drawsOrdered);$i++){
        array_push($drawsOrderedJson, $drawsOrdered[$i]->draw);
    }

    $response = [
        'draws' => $drawsOrderedJson
    ];

    $headers = ['Content-Type' => 'application/json; charset=UTF-8',
    'charset' => 'utf-8'];

    return response()->json($response, 200, $headers);
}


    public function getSearchResults($text){
        $draws =
        DB::table('draws')->join('arts','arts.id','=','draws.id')->where('arts.name', 'LIKE', '%' . $text . '%')->get();
        $response = [
            'draws' => $draws
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];
        return response()->json($response, 200, $headers);
    }
}
