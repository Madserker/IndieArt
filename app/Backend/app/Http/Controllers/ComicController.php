<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comic;
use DB;
use App\Art;
use App\Team;
use JWTAuth;
use Illuminate\Support\Facades\Storage;

class ComicVisits{
    public $comic;
    public $visits;

    function __construct($comic, $visits) {
        $this->comic = $comic;
        $this->visits = $visits;
    }
}

class ComicScore{
    public $comic;
    public $score;

    function __construct($comic, $score) {
        $this->comic = $comic;
        $this->score = $score;
    }
}

class ComicController extends Controller
{
    
    public function postComic(Request $request){
        //confirmamos que este metodo solo se pueda ejecutar si el usuario esta logueado

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        $art = new Art();


        $file = $request->file('photo');//Cogemos el file de la request

        $path = Storage::putfile('comics', $file);//cogemos el path con el nombre del file que laravel ha creado automaticamente

        $art->image_path = "Backend/storage/app/".$path;//le pasamos este path a la base de datos

        $art->name = $request->input('name');//cogemos los datos del draw desde la request del frontend
        $art->author = $request->input('author');
        $art->descripcion = $request->input('synopsis');
  
        $art->save();

        $comic = new Comic();
        //default values        
        $comic->status = "Airing";

        $comic->id = $art->id;

        $comic->save();//guardamos el draw
        return response()->json([$comic->id], 201);//retornamos 201 y el id
    }

    public function getComics(){
        $comics = 
        DB::table('arts')
        ->join('comics', 'arts.id', '=', 'comics.id')
        ->select('arts.*','comics.*')
        ->get();

        $response = [
            'comics' => $comics
        ];

        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }


    public function getComicChapters($id){//json de capitulos del comic 
        $comics = 
        Comic::with('chapters')
        ->where('comics.id', $id)
        ->join('arts', 'arts.id', '=', 'comics.id')
        ->select('arts.*','comics.*')
        ->get();

        $response = [
            'chapters' => $comics[0]->chapters//sabemos los capitulos con la foreignKey de capitulos
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }

    public function getComicsByAuthor($author){//metodo para obtener los dibujos de un usuario
        $comics = 
        DB::table('arts')
        ->where('arts.author', $author)
        ->join('comics', 'arts.id', '=', 'comics.id')
        ->select('arts.*','comics.*')
        ->get();

        if(!$comics){//si no ha encontrado ningun draw
            return response()->json(['message' => 'Comcs not found'],404);//json con mensaje de error 404 not found
        }
        return response()->json(['comics' => $comics],200);
    }

    
    public function getComicById($id){

        $comic = 
        DB::table('arts')
        ->where('arts.id', $id)
        ->join('comics', 'arts.id', '=', 'comics.id')
        ->select('arts.*','comics.*')
        ->get();

        if(!$comic){//si no ha encontrado el draw con ese id
            return response()->json(['message' => 'Comic not found'],404);//json con mensaje de error 404 not found
        }
        return response()->json(['comic' => $comic[0]],200);
        
    }

    public function putComic(Request $request, $id){//actualizar draw atributes

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $comic = Comic::find($id);
        if(!$comic){//si no ha encontrado el draw con ese id
            return response()->json(['message' => 'Comic not found'],404);//json con mensaje de error 404 not found
        }
        $comic->name = $request->input('name');
        $comic->save();
        return response()->json(['comic' => $comic],200);
    }

    public function deleteComic($id){

        if(! $userA = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        $comic = Comic::find($id);
        $art = Art::find($id);



 //importante realizar esta comprobacion en las DELETE requests
 $isCurrentUser = false;



 //buscamos si el usuario esta dentro del equipo
 $users=
 DB::table('team_user')
 ->where('team_user.team',$art->author)
 ->select('team_user.user','team_user.role','team_user.created_at','team_user.admin')
 ->get();

 for($i=0;$i<count($users);$i++){
     if($users[$i]->user == $userA->username){
         $isCurrentUser = true;
     }
 }

 if($userA->username == $art->author){
     $isCurrentUser=true;
 }
if($isCurrentUser){
        $comic->delete();
        $art->delete();
        return response()->json(['message' => 'Comic deleted'],200);
    }
    else{
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

public function getComicsOrderByVisits(){
    $comics = 
    DB::table('arts')
    ->join('comics', 'arts.id', '=', 'comics.id')
    ->select('arts.*','comics.*')
    ->get();

    $comicsOrdered = [];
    $comicsOrderedJson = [];

    for($i=0;$i<sizeof($comics);$i++){
        array_push($comicsOrdered, new ComicVisits($comics[$i],ArtController::getVisitsNoJson($comics[$i]->id)));
    }

    usort($comicsOrdered, array($this, "cmpVisits"));

    for($i=0;$i<sizeof($comicsOrdered);$i++){
        array_push($comicsOrderedJson, $comicsOrdered[$i]->comic);
    }

    $response = [
        'comics' => $comicsOrderedJson
    ];

    $headers = ['Content-Type' => 'application/json; charset=UTF-8',
    'charset' => 'utf-8'];

    return response()->json($response, 200, $headers);
}

public function getComicsOrderByScore(){
    $comics = 
    DB::table('arts')
    ->join('comics', 'arts.id', '=', 'comics.id')
    ->select('arts.*','comics.*')
    ->get();

    $comicsOrdered = [];
    $comicsOrderedJson = [];

    for($i=0;$i<sizeof($comics);$i++){
        array_push($comicsOrdered, new ComicScore($comics[$i],ArtController::getScoreNoJson($comics[$i]->id)));
    }

    usort($comicsOrdered, array($this, "cmpScore"));

    for($i=0;$i<sizeof($comicsOrdered);$i++){
        array_push($comicsOrderedJson, $comicsOrdered[$i]->comic);
    }

    $response = [
        'comics' => $comicsOrderedJson
    ];

    $headers = ['Content-Type' => 'application/json; charset=UTF-8',
    'charset' => 'utf-8'];

    return response()->json($response, 200, $headers);
}

public function getSearchResults($text){
    $comics =
    DB::table('comics')->join('arts','arts.id','=','comics.id')->where('arts.name', 'LIKE', '%' . $text . '%')->get();
    $response = [
        'comics' => $comics
    ];
    $headers = ['Content-Type' => 'application/json; charset=UTF-8',
    'charset' => 'utf-8'];
    return response()->json($response, 200, $headers);
}
}












