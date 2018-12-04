<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\TeamController;
use JWTAuth;
use App\Chat;
use App\TeamChat;
use DB;

class ChatController extends Controller
{

    public static function createTeamChat($team,$description){
        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $chat = new Chat([
            'name' => $team ,//mismo name que el teamchat para encontrarlo con INNER JOIN
            'description' => $description
        ]);

        $chat->save();

        $teamChat = new TeamChat([
            'id'=>$chat->id,
            'team'=>$team
        ]);

        $teamChat->save();
        
        
        DB::table('chat_user')->insert([
            ['chat' => $chat->id, 'user' => $user->username],
        ]);


        $response = [
            'teamChat' => $teamChat
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);

    }



    public function getTeamChats($username){
//get user teams
        $user = User::find($username);
        //$users = $team->users;
        $teams=
        DB::table('team_user')
        ->join('authors', 'authors.username', '=', 'team_user.team')
        ->where('team_user.user',$username)
        ->select('authors.username')
        ->get();

        $teamChats = [];

        for($i=0;$i<sizeof($teams);$i++){
            $temp = 
            DB::table('team_chats')
            ->where('team_chats.team', $team)
            ->join('chats', 'chats.id', '=', 'team_chats.id')
            ->select('chats.*','team_chats.*')
            ->get();
            array_push($teamChats,$temp);

        }

        $response = [
            'teamChats' => $teamChats
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }
    
    //post message on chat
    //post private chat
    //post team chat
    //post public chat
    //add user to chat
    //delete chat
    //remove user from chat
    //get messages from chat
}
