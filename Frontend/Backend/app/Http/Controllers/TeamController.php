<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Team;
use App\User;
use App\Author;
use DB;
use App\Http\Controllers\Controller;
use JWTAuth;
use Illuminate\Support\Facades\Storage;

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
        //$users = $team->users;
        $users=
        DB::table('team_user')
        ->where('team_user.team',$username)
        ->select('team_user.user','team_user.role','team_user.created_at','team_user.admin')
        ->get();
        $response = [
            'users' => $users
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }

    public function getTeamByUsername($username){
        $team = Team::find($username);

        $team = 
        DB::table('teams')
        ->where('teams.username', $username)
        ->join('authors', 'teams.username', '=', 'authors.username')
        ->select('authors.*','teams.*')
        ->get();

        $response = [
            'team' => $team[0]
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }

    public function createTeam(Request $request){

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $randomPic = ['src/assets/storage/profile1.jpg','src/assets/storage/profile2.png',
        'src/assets/storage/profile3.png','src/assets/storage/profile4.jpg',
        'src/assets/storage/profile5.jpg','src/assets/storage/profile6.jpg'];

        $this->validate($request,[//validamos el registro
        'username' => 'required|unique:authors', //el nombre de usuario es obligatorio y unico en la tabla de authors
        ]);

        $path = array_random($randomPic);//default image

        $file = $request->file('photo');//Cogemos el file de la request


        if($file!=null){

            $pathTemp = Storage::putfile('profileImages', $file);//cogemos el path con el nombre del file que laravel ha creado automaticamente

            $path = "Backend/storage/app/".$pathTemp;
        }


        $author = new Author([
            'username' => $request->input('username'),//mismo username que el team para encontrarlo con INNER JOIN
            'description' => $request->input('description'),
            'profile_picture' => $path
        ]);

        $team = new Team([
            'username' => $request->input('username'),//mismo username que el author para encontrarlo con INNER JOIN
        ]);
        

        $team->save();
        $author->save();

       $this->addUserToTeam($request->input('username'), $user->username,$request->input('role'),true);

        return response()->json(['author' => $author],200);

    }

    public function addUserToTeam($team,$user,$role,$admin){
        DB::table('team_user')->insert([
            ['team' => $team, 'user' => $user, 'role' => $role, 'admin' => $admin],
        ]);
    }

    public function postUserToTeam(Request $request){
        $this->addUserToTeam($request->input('team'), $request->input('user'),$request->input('role'),$request->input('admin'));
    }

    public function getUserTeams($username){
        $user = User::find($username);
        //$users = $team->users;
        $teams=
        DB::table('team_user')
        ->join('authors', 'authors.username', '=', 'team_user.team')
        ->where('team_user.user',$username)
        ->select('authors.*')
        ->get();

        $response = [
            'teams' => $teams
        ];
        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);

    }

    public function removeUserFromTeam($team,$member){

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        //comprobamos que seamos un administrador en el lado del backend tambien:
        $check=
        DB::table('team_user')
        ->where('team_user.user',$user->username)
        ->get();

        if(!$check[0]->admin){//si no somos administrador
            return response()->json(['message' => 'No eres administrador del equipo'],404); //si no hay token o no es correcto lanza un error
        }
    
        DB::table('team_user')
        ->where('team_user.user',$member)
        ->where('team_user.team',$team)
        ->delete();

        return response()->json(['message' => 'user deleted'],200);
    }
    //promote to admin

    //edit role

    //delete team

    //delete user on team

}
