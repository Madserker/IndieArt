<?php

namespace App\Http\Controllers;

use App\Chapter;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ChapterController extends Controller
{
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
