<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Team;
use DB;
use App\Http\Controllers\Controller;

class TeamController extends Controller
{
    public function getTeams(){
        $teams = 
        DB::table('teams')
        ->join('authors', 'teams.username', '=', 'authors.username')
        ->select('authors.*','teams.*')
        ->get();
        $response = [
            'teams' => $teams
        ];

        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }

    public function getTeamUsers($username){
        $team = Team::find($username);
        $users = $team->users;
        $response = [
            'users' => $users
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);

    }
}
