<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Draw;
use App\Comic;
use App\Animation;

class CommentsController extends Controller
{
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
}
