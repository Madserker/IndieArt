<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Draw;
use App\Comic;
use App\Animation;
use App\DrawComment;
use App\ComicComment;
use App\AnimationComment;


class CommentsController extends Controller
{

    public function getComments($id){
        $art = Art::find($id);
        $response = [
            'comments' => $art->comments
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }

    public function postComment(Request $request){
        //confirmamos que este metodo solo se pueda ejecutar si el usuario esta logueado
        if(!$user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        $comment = new Comment();
        $comment->text = $request->input('text');//cogemos los datos del comentario desde la request del frontend
        $comment->art_id = $request->input('art_id');
        $comment->user = $request->input('user');
    
        $comment->save();//guardamos el comentario
        return response()->json(['Comment' => $comment], 201);//retornamos 201 y el comentario
    }

    public function deleteComment($id){

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }


        //ToDo: COMPROBAR SI ES EL USUARIO CORRECTO!!!!!!

        $comment = Comment::find($id);
        $comment->delete();
        return response()->json(['message' => 'comment deleted'],200);
    }

//===========================================================================================================OLD METHODS
    public function getDrawComments($id){
        $draw = Draw::find($id);
        $response = [
            'comments' => $draw->comments
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }
    public function getComicComments($id){
        $comic = Comic::find($id);
        $response = [
            'comments' => $comic->comments
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }
    public function getAnimationComments($id){
        $animation = Animation::find($id);
        $response = [
            'comments' => $animation->comments
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }

    public function postDrawComment(Request $request){
        //confirmamos que este metodo solo se pueda ejecutar si el usuario esta logueado
        if(!$user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        $drawComment = new DrawComment();
        $drawComment->text = $request->input('text');//cogemos los datos del comentario desde la request del frontend
        $drawComment->draw_id = $request->input('draw_id');
        $drawComment->username = $request->input('username');
    
        $drawComment->save();//guardamos el comentario
        return response()->json(['drawComment' => $drawComment], 201);//retornamos 201 y el comentario
    }

    public function postComicComment(Request $request){
        //confirmamos que este metodo solo se pueda ejecutar si el usuario esta logueado
        if(!$user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        $comicComment = new ComicComment();
        $comicComment->text = $request->input('text');//cogemos los datos del comentario desde la request del frontend
        $comicComment->comic_id = $request->input('comic_id');
        $comicComment->username = $request->input('username');
    
        $comicComment->save();//guardamos el comentario
        return response()->json(['comicComment' => $comicComment], 201);//retornamos 201 y el comentario
    }

    public function postAnimationComment(Request $request){
        //confirmamos que este metodo solo se pueda ejecutar si el usuario esta logueado
        if(!$user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        $animationComment = new AnimationComment();
        $animationComment->text = $request->input('text');//cogemos los datos del comentario desde la request del frontend
        $animationComment->animation_id = $request->input('animation_id');
        $animationComment->username = $request->input('username');
    
        $animationComment->save();//guardamos el comentario
        return response()->json(['animationComment' => $animationComment], 201);//retornamos 201 y el comentario
    }

    public function deleteDrawComment($id){

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $drawComment = DrawComment::find($id);
        $drawComment->delete();
        return response()->json(['message' => 'drawComment deleted'],200);
    }

    public function deleteComicComment($id){

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $comicComment = ComicComment::find($id);
        $comicComment->delete();
        return response()->json(['message' => 'comicComment deleted'],200);
    }

    public function deleteAnimationComment($id){

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $animationComment = AnimationComment::find($id);
        $animationComment->delete();
        return response()->json(['message' => 'animationComment deleted'],200);
    }
}
