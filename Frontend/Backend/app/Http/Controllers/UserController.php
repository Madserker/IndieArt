<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Draw;
use App\Animation;
use App\Episode;
use App\Chapter;
use App\Comic;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
use Illuminate\Support\Facades\Storage;


class Notification{
    public $time;
    public $name;
    public $username;
    public $user_image;
    public $image;
    public $id;//id of episode,draw or chapter
    public $parent_id;//id of animation or comic
    public $parent_name;//name of animation or comic
    public $type;

    function __construct($time, $name, $username, $user_image, $image, $id, $parent_id, $parent_name, $type) {
        $this->time = $time;
        $this->name = $name;
        $this->username = $username;
        $this->user_image = $user_image;
        $this->image = $image;
        $this->id = $id;
        $this->parent_id = $parent_id;
        $this->parent_name = $parent_name;
        $this->type = $type; 
    }
    
}


class UserController extends Controller
{


//==============================================================LOGIN/REGISTER METHODS
    public function signup(Request $request){

        $randomPic = ['src/assets/storage/profile1.jpg','src/assets/storage/profile2.png',
        'src/assets/storage/profile3.png','src/assets/storage/profile4.jpg',
        'src/assets/storage/profile5.jpg','src/assets/storage/profile6.jpg'];

        $this->validate($request,[//validamos el registro
        'username' => 'required|unique:users', //el nombre de usuario es obligatorio y unico en la tabla de usuarios
        'email' => 'required|email|unique:users', //el email tiene que ser obligatorio, formato email y unico en la tabla de usuarios
        'password' => 'required', //contraseña obligatoria
            ]);
        $user = new User([//creamos el usuario con los parametros del request
            'profilePic' => array_random($randomPic),//default image
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'birthday' => $request->input('birthday'),
            'password' => bcrypt($request->input('password')), //bcrypt encripta la contraseña del usuario
            'description' => "",
        ]);
        $user->save();//guardamos el usuario en la DB
        return response()->json([
            'message' => 'User succesfully created'
        ],201);
    }

    public function signin(Request $request){
        $this->validate($request,[//validamos el registro
            'username' => 'required', //el nombre es obligatorio
            'password' => 'required', //contraseña obligatoria
                ]);
            $credentials = $request->only('username','password');
            $user = User::where('username', $request->input('username'))->get();
            try {
                if(!$token = JWTAuth::attempt($credentials)){//intenta crear token
                //si if falla, las credenciales no son validas
                    return response()->json([//return error
                        'error' => 'Invalid Credentials'
                    ], 401);
                }
            }catch(JWTException $e){//si no ha podido crear el token
                return response()->json([
                    'error' => 'Could not create token'
                ], 500);
            }
            return response()->json([//si las credenciales son validas y no ha habido error al crear token, retornamos token y usuario
                'token' => $token,
                'user' => $user
            ],200);
    }  
    
    

    //===============================================USERS METHODS
    public function getUsers(){
        $users = User::all();
        $response = [
            'users' => $users
        ];

        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }

    public function getUserByUsername(String $username){
        $user = User::where('username',$username)->get();
        if(!$user){//si no ha encontrado el user con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }
        return response()->json(['user' => $user],200);
    }

    public function getFollowers(String $username){
        $user = User::where('username',$username)->get();
        if(!$user){//si no ha encontrado el user con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }
        return response()->json(['followers' => $user[0]->followers],200);
    }

    public function getFollowing(String $username){
        $user = User::where('username',$username)->get();
        if(!$user){//si no ha encontrado el user con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }
        return response()->json(['followers' => $user[0]->following],200);
    }

    public function follow(Request $request){
        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        $user = User::find($request->input('username'));

        if (!$user->followers->contains($request->input('follower'))) {//comprobamos que no este esta relacion ya en la tabla
            $user->followers()->attach($request->input('follower'));
            return response()->json(['user' => $user], 201);//retornamos 201
        }
        return response()->json(['message' => 'Already following that user'],404); //si ya seguimos al usuario, lanzamos error
    }

    public function unfollow($following,$username){

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $user = User::find($username);
        if ($user->following->contains($following)) {//comprobamos que este esta relacion ya en la tabla
            $user->following()->detach($following);
            return response()->json(['user' => $user], 201);//retornamos 201
        }
        return response()->json(['message' => 'You do not follow that user'],404); //si ya seguimos al usuario, lanzamos error
    }


//====================================================================================================================FRIENDS UPDATES
    public function getFollowingUsersDraws($username){
        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        $user = User::find($username);
        if(!$user){//si no ha encontrado el user con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }
        $following = $user->following;
        $draws = [];
        for($i=0; $i<sizeof($following);$i++){
            $authorDraws = Draw::where('author',$following[$i]->username)->get();//get draws del following $i
            for($j=0; $j<sizeof($authorDraws);$j++){
                array_push($draws,$authorDraws[$j]);//insertar draw en la lista
            }
        }
        return response()->json(['draws' => $draws],200); 
    }

    public function getFollowingUsersEpisodes($username){
        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        $user = User::find($username);
        if(!$user){//si no ha encontrado el user con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }
        $following = $user->following;
        $episodes = [];
        for($i=0; $i<sizeof($following);$i++){
            $authorAnimations = Animation::where('author',$following[$i]->username)->get();//get episodes del following $i
            for($j=0; $j<sizeof($authorAnimations);$j++){
                for($k=0;$k<sizeof($authorAnimations[$j]->episodes);$k++){//get episodes de la animacion
                    array_push($episodes,$authorAnimations[$j]->episodes[$k]);//insertar episode en la lista
                }
            }
        }
        return response()->json(['episodes' => $episodes],200); 
    }

    public function getFollowingUsersChapters($username){
        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        $user = User::find($username);
        if(!$user){//si no ha encontrado el user con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }
        $following = $user->following;
        $chapters = [];
        for($i=0; $i<sizeof($following);$i++){
            $authorComics = Comic::where('author',$following[$i]->username)->get();//get chapters del following $i
            for($j=0; $j<sizeof($authorComics);$j++){
                for($k=0;$k<sizeof($authorComics[$j]->chapters);$k++){//get chapters del comic
                    array_push($chapters,$authorComics[$j]->chapters[$k]);//insertar chapter en la lista
                }
            }
        }
        return response()->json(['chapters' => $chapters],200); 
    }

    public function getNotifications($username){
        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        $user = User::find($username);
        if(!$user){//si no ha encontrado el user con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }


        $following = $user->following;
        $following->push($user);//añadimos tu actividad a la lista

        $notifications = [];


        for($i=0; $i<sizeof($following);$i++){
            

            //get draws
            $authorDraws = Draw::where('author',$following[$i]->username)->get();//get draws del following $i
            for($j=0; $j<sizeof($authorDraws);$j++){
                $notification = new Notification($authorDraws[$j]->created_at, $authorDraws[$j]->name,
                $authorDraws[$j]->author, $following[$i]->profilePic, $authorDraws[$j]->imagePath,$authorDraws[$j]->id,$authorDraws[$j]->id,$authorDraws[$j]->name,1);

                array_push($notifications,$notification);//insertar draw en la lista
            }

            //get episodes
            $authorAnimations = Animation::where('author',$following[$i]->username)->get();//get episodes del following $i
            for($j=0; $j<sizeof($authorAnimations);$j++){
                for($k=0;$k<sizeof($authorAnimations[$j]->episodes);$k++){//get episodes de la animacion
                    $notification = new Notification($authorAnimations[$j]->episodes[$k]->created_at, $authorAnimations[$j]->episodes[$k]->name,
                    $authorAnimations[$j]->author, $following[$i]->profilePic, $authorAnimations[$j]->episodes[$k]->videoPath, $authorAnimations[$j]->episodes[$k]->id
                    ,$authorAnimations[$j]->id, $authorComics[$j]->name,3);
                    
                    array_push($notifications,$notification);//insertar draw en la lista
                }
            }

            //get chapters
            $authorComics = Comic::where('author',$following[$i]->username)->get();//get episodes del following $i
            for($j=0; $j<sizeof($authorComics);$j++){
                for($k=0;$k<sizeof($authorComics[$j]->chapters);$k++){//get episodes de la animacion
                    $notification = new Notification($authorComics[$j]->chapters[$k]->created_at, $authorComics[$j]->chapters[$k]->name,
                    $authorComics[$j]->author, $following[$i]->profilePic, "", $authorComics[$j]->chapters[$k]->id, $authorComics[$j]->id
                   ,$authorComics[$j]->name,2);
                    
                    array_push($notifications,$notification);//insertar draw en la lista
                }   
            }

        }

        //ordenamos de mas reciente a menos
        $notifications = collect($notifications)->sortBy('time')->reverse()->values();

        return response()->json([
            'notifications' => $notifications
        ],200); 
    }



    //================================================================================PUT
    public function putUserDescription(Request $request, $username){//actualizar user atributes

        if(!$userA = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $user = User::find($username);
        if(!$user){//si no ha encontrado el draw con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }

        //importante realizar esta comprobacion en las PUT requests
        if($userA->username != $username){//si no es el mismo usuario que el que esta logeado, devolvemos error
            return response()->json(['message' => 'You are not the user'],404);//json con mensaje de error 404 not found
        }

        $user->description = $request->input('description');

        $user->save();
        return response()->json(['user' => $user],200);
    }

    public function putUserImage(Request $request, $username){//actualizar user atributes

        if(!$userA = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $user = User::find($username);
        if(!$user){//si no ha encontrado el draw con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }

        //importante realizar esta comprobacion en las PUT requests
        if($userA->username != $username){//si no es el mismo usuario que el que esta logeado, devolvemos error
            return response()->json(['message' => 'You are not the user'],404);//json con mensaje de error 404 not found
        }

        $file = $request->file('photo');//Cogemos el file de la request

        $path = Storage::putfile('profileImages', $file);//cogemos el path con el nombre del file que laravel ha creado automaticamente

        $user->profilePic = "Backend/storage/app/".$path;//le pasamos este path a la base de datos

        $user->save();
        return response()->json(['user' => $user],200);
    }

}
