<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;
use Illuminate\Support\Facades\Storage;
use App\Page;

class PageController extends Controller
{
    public function postPage(Request $request){
        //confirmamos que este metodo solo se pueda ejecutar si el usuario esta logueado

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
            $page = new Page();
            $page->number = $request->input('number');
            $page->chapter_id = $request->input('chapter_id');
            $file = $request->file('file');//Cogemos el file de la request
            $path = Storage::putfile('comics/chapters', $file);//cogemos el path con el nombre del file que laravel ha creado automaticamente
            $page->imagePath="Backend/storage/app/".$path;
            $page->save();

        return response()->json(['page' => $page], 201);//retornamos 201 y el comic
    }

}
