<?php

namespace App\Http\Controllers;

use App\Chapter;
use App\Page;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;
use Illuminate\Support\Facades\Storage;
use DB;
use App\Comic;

class ChapterController extends Controller
{
    
    public function postChapter(Request $request){
        //confirmamos que este metodo solo se pueda ejecutar si el usuario esta logueado

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        $chapter = new Chapter();

        $chapter->name = $request->input('name');//cogemos los datos del draw desde la request del frontend
        $chapter->number = $request->input('number');
        $chapter->comic_id = $request->input('comic_id');
        $chapter->image_path = "";//proximas actualizaciones donde los capitulos tengan portada

        $chapter->save();//guardamos el chapter


        return response()->json(['chapter' => $chapter], 201);//retornamos 201 y el comic
    }
    
    
    
    public function getChapterPages($id){//json de paginas del capitulo 
        $chapter = Chapter::find($id);
        $response = [
            'pages' => $chapter->pages//sabemos las paginas con la foreignKey de pages
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }


    public function deleteChapter($id){

        if(! $userA = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        $chapter = Chapter::find($id);



             //importante realizar esta comprobacion en las DELETE requests
        $isCurrentUser = false;
        //cogemos el comic del capitulo
        $comic = Comic::find($chapter->comic_id);

        //buscamos si el usuario esta dentro del equipo
        $users=
        DB::table('team_user')
        ->where('team_user.team',$comic->author)
        ->select('team_user.user','team_user.role','team_user.created_at','team_user.admin')
        ->get();

        for($i=0;$i<count($users);$i++){
            if($users[$i]->user == $userA->username){
                $isCurrentUser = true;
            }
        }
   


        if($userA->username != $comic->author){
            $isCurrentUser=true;
        }

        if($isCurrentUser){
            $chapter->delete();
            return response()->json(['message' => 'Chapter deleted'],200);
        }else{//si no es el mismo usuario que el que esta logeado, devolvemos error
            return response()->json(['message' => 'You are not the user'],404);//json con mensaje de error 404 not found
        }

    }
}
