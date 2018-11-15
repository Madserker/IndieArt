<?php

namespace App\Http\Controllers;

use App\Draw;
use Illuminate\Http\Request;
use JWTAuth;
use Illuminate\Support\Facades\Storage;




class DrawController extends Controller
{

    public function postDraw(Request $request){
        //confirmamos que este metodo solo se pueda ejecutar si el usuario esta logueado
        

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        //$user = JWTAuth::parseToken()->toUser(); //Retorna el usuario del token

        $draw = new Draw();

        $file = $request->file('photo');//Cogemos el file de la request

        $path = Storage::putfile('draws', $file);//cogemos el path con el nombre del file que laravel ha creado automaticamente

        $draw->imagePath = "Backend/storage/app/".$path;//le pasamos este path a la base de datos

        //rellenamos el resto de datos con la request
        $draw->name = $request->input('name');
        $draw->author = $request->input('author');
        $draw->descripcion = $request->input('descripcion');

        //default values        
        $draw->mark = 0;
        $draw->visits = 0;

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

    public function getDrawById($id){
        $draw = Draw::find($id);
        if(!$draw){//si no ha encontrado el draw con ese id
            return response()->json(['message' => 'Draw not found'],404);//json con mensaje de error 404 not found
        }
        return response()->json(['draw' => $draw],200);
        
    }

    public function getDrawsByAuthor($author){//metodo para obtener los dibujos de un usuario
        $draws = Draw::where('author',$author)->get();
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

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $draw = Draw::find($id);
        $draw->delete();
        return response()->json(['message' => 'Draw deleted'],200);
    }
}
