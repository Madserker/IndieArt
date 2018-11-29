<?php

namespace App\Http\Controllers;

use App\Chapter;
use App\Page;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;
use Illuminate\Support\Facades\Storage;

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
}
