<?php

namespace App\Http\Controllers;

use App\Draw;
use Illuminate\Http\Request;
use JWTAuth;


class DrawController extends Controller
{

    public function postDraw(Request $request){
        //confirmamos que este metodo solo se pueda ejecutar si el usuario esta logueado

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        $draw = new Draw();
        $draw->name = $request->input('name');//cogemos los datos del draw desde la request del frontend
        $draw->author = $request->input('author');
        $draw->imagePath = $request->input('imagePath');       
        $draw->save();//guardamos el draw
        return response()->json(['draw' => $draw], 201);//retornamos 201 y el dibujo
    }

    public function getDraws(){
        $draws = Draw::all();
        $response = [
            'draws' => $draws
        ];

        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);



    }

    public function putDraw(Request $request, $id){//actualizar draw atributes
        $draw = Draw::find($id);
        if(!$draw){//si no ha encontrado el draw con ese id
            return response()->json(['message' => 'Draw not found'],404);//json con mensaje de error 404 not found
        }
        $draw->name = $request->input('name');
        $draw->save();
        return response()->json(['draw' => $draw],200);
    }

    public function deleteDraw($id){
        $draw = Draw::find($id);
        $draw->delete();
        return response()->json(['message' => 'Draw deleted'],200);
    }
}
