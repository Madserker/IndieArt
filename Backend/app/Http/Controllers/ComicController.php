<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comic;

class ComicController extends Controller
{
    public function postComic(Request $request){
        //confirmamos que este metodo solo se pueda ejecutar si el usuario esta logueado
        

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        //$user = JWTAuth::parseToken()->toUser(); //Retorna el usuario del token

        $comic = new Comic();
        $comic->name = $request->input('name');//cogemos los datos del draw desde la request del frontend
        $comic->author = $request->input('author');
        $comic->imagePath = $request->input('imagePath');       
        $comic->save();//guardamos el draw
        return response()->json(['comic' => $comic], 201);//retornamos 201 y el comic
    }

    public function getComics(){
        $comics = Comic::all();
        $response = [
            'comics' => $comics
        ];

        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
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

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $comic = Comic::find($id);
        $comic->delete();
        return response()->json(['message' => 'Comic deleted'],200);
    }
}
