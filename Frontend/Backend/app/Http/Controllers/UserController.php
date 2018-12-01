<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Draw;
use App\Animation;
use App\Episode;
use App\Chapter;
use App\Comic;
use App\Author;
use DB;
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
        'username' => 'required|unique:authors', //el nombre de usuario es obligatorio y unico en la tabla de authors
        'email' => 'required|email|unique:users', //el email tiene que ser obligatorio, formato email y unico en la tabla de usuarios
        'password' => 'required', //contraseña obligatoria
        'birthday' => 'required',
        'real_name' => 'required',
            ]);
        $author = new Author([
            'profile_picture' => array_random($randomPic),//default image
            'username' => $request->input('username'),
            'description' => "",
        ]);

        $user = new User([//creamos el usuario con los parametros del request
            'real_name' => $request->input('real_name'),
            'email' => $request->input('email'),
            'birthday' => $request->input('birthday'),
            'password' => bcrypt($request->input('password')), //bcrypt encripta la contraseña del usuario
            'username' => $request->input('username'),//mismo username que el author para encontrarlo con INNER JOIN
        ]);
        $author->save();
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
            //$user = User::where('username', $request->input('username'))->get();
            
            //FIND THE USER AND SEARCH ITS AUTHOR ATTRIBUTES WITH INNER JOIN
            $users = 
            DB::table('users')
            ->where('users.username', $request->input('username'))
            ->join('authors', 'users.username', '=', 'authors.username')
            ->select('authors.*','users.*')
            ->get();

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
                'user' => $users[0]
            ],200);
    }  
    
    

    //===============================================USERS METHODS
    public function getUsers(){
        //inner join
        $users = 
        DB::table('users')
        ->join('authors', 'users.username', '=', 'authors.username')
        ->select('authors.*','users.*')
        ->get();

        $response = [
            'users' => $users
        ];

        $headers = ['Content-Type' => 'application/json; charset=UTF-8',
        'charset' => 'utf-8'];

        return response()->json($response, 200, $headers);
    }

    public function getUserByUsername(String $username){

        $user = 
        DB::table('users')
        ->where('users.username', $username)
        ->join('authors', 'users.username', '=', 'authors.username')
        ->select('authors.*','users.*')
        ->get();

        if(!$user){//si no ha encontrado el user con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }
        return response()->json(['user' => $user[0]],200);
    }

    public function getFollowers(String $username){
        $author = Author::where('username',$username)->get();
        if(!$author){//si no ha encontrado el user con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }
        return response()->json(['followers' => $author[0]->followers],200);
    }

    public function getFollowing(String $username){
        $author = Author::where('username',$username)->get();
        if(!$author){//si no ha encontrado el user con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }
        return response()->json(['followers' => $author[0]->following],200);
    }

    public function follow(Request $request){
        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        
        $author = Author::find($request->input('username'));

        if (!$author->followers->contains($request->input('follower'))) {//comprobamos que no este esta relacion ya en la tabla
            $author->followers()->attach($request->input('follower'));
            return response()->json(['author' => $author], 201);//retornamos 201
        }
        return response()->json(['message' => 'Already following that user'],404); //si ya seguimos al usuario, lanzamos error
    }

    public function unfollow($following,$username){

        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $author = Author::find($username);
        if ($author->following->contains($following)) {//comprobamos que este esta relacion ya en la tabla
            $author->following()->detach($following);
            return response()->json(['author' => $author], 201);//retornamos 201
        }
        return response()->json(['message' => 'You do not follow that user'],404); //si ya seguimos al usuario, lanzamos error
    }


//====================================================================================================================FRIENDS UPDATES
    // public function getFollowingUsersDraws($username){
    //     if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
    //         return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
    //     }
    //     $user = User::find($username);
    //     if(!$user){//si no ha encontrado el user con ese id
    //         return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
    //     }
    //     $following = $user->following;
    //     $draws = [];
    //     for($i=0; $i<sizeof($following);$i++){
    //         $authorDraws = Draw::where('author',$following[$i]->username)->get();//get draws del following $i
    //         for($j=0; $j<sizeof($authorDraws);$j++){
    //             array_push($draws,$authorDraws[$j]);//insertar draw en la lista
    //         }
    //     }
    //     return response()->json(['draws' => $draws],200); 
    // }

    // public function getFollowingUsersEpisodes($username){
    //     if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
    //         return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
    //     }
    //     $user = User::find($username);
    //     if(!$user){//si no ha encontrado el user con ese id
    //         return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
    //     }
    //     $following = $user->following;
    //     $episodes = [];
    //     for($i=0; $i<sizeof($following);$i++){
    //         $authorAnimations = Animation::where('author',$following[$i]->username)->get();//get episodes del following $i
    //         for($j=0; $j<sizeof($authorAnimations);$j++){
    //             for($k=0;$k<sizeof($authorAnimations[$j]->episodes);$k++){//get episodes de la animacion
    //                 array_push($episodes,$authorAnimations[$j]->episodes[$k]);//insertar episode en la lista
    //             }
    //         }
    //     }
    //     return response()->json(['episodes' => $episodes],200); 
    // }

    // public function getFollowingUsersChapters($username){
    //     if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
    //         return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
    //     }
    //     $user = User::find($username);
    //     if(!$user){//si no ha encontrado el user con ese id
    //         return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
    //     }
    //     $following = $user->following;
    //     $chapters = [];
    //     for($i=0; $i<sizeof($following);$i++){
    //         $authorComics = Comic::where('author',$following[$i]->username)->get();//get chapters del following $i
    //         for($j=0; $j<sizeof($authorComics);$j++){
    //             for($k=0;$k<sizeof($authorComics[$j]->chapters);$k++){//get chapters del comic
    //                 array_push($chapters,$authorComics[$j]->chapters[$k]);//insertar chapter en la lista
    //             }
    //         }
    //     }
    //     return response()->json(['chapters' => $chapters],200); 
    // }

    public function getNotifications($username){
        if(! $user = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }
        $author = Author::find($username);
        if(!$author){//si no ha encontrado el user con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }


        $following = $author->following;
        $following->push($author);//añadimos tu actividad a la lista



        


        $notifications = [];


        for($i=0; $i<sizeof($following);$i++){

        //     //get draws

            $authorDraws = 
            DB::table('draws')
            ->join('arts', 'arts.id', '=', 'draws.id')
            ->select('arts.*','draws.*')
            ->where('arts.author',$following[$i]->username)
            ->get();//get draws del following $i

            for($j=0; $j<sizeof($authorDraws);$j++){
                $notification = new Notification(
                    $authorDraws[$j]->created_at, 
                    $authorDraws[$j]->name,
                    $authorDraws[$j]->author, 
                    $following[$i]->profile_picture, 
                    $authorDraws[$j]->image_path,
                    $authorDraws[$j]->id,
                    $authorDraws[$j]->id,
                    $authorDraws[$j]->name,
                    1
                );
                array_push($notifications,$notification);//insertar draw en la lista
            }

            //get episodes
            $authorAnimations = 
            Animation::with('episodes')
            ->join('arts', 'arts.id', '=', 'animations.id')
            ->select('arts.*','animations.*')
            ->where('arts.author',$following[$i]->username)
            ->get();//get animations del following $i

            for($j=0; $j<sizeof($authorAnimations);$j++){
                for($k=0;$k<sizeof($authorAnimations[$j]->episodes);$k++){//get episodes de la animacion
                    $notification = new Notification(
                        $authorAnimations[$j]->episodes[$k]->created_at, 
                        $authorAnimations[$j]->episodes[$k]->name,
                        $authorAnimations[$j]->author, 
                        $following[$i]->profile_picture, 
                        $authorAnimations[$j]->episodes[$k]->video_path, 
                        $authorAnimations[$j]->episodes[$k]->id,
                        $authorAnimations[$j]->id, 
                        $authorAnimations[$j]->name,
                        3
                    );
                    
                    array_push($notifications,$notification);//insertar draw en la lista
                }
            }

        // //     //get chapters
            $authorComics = 
            Comic::with('chapters')
            ->join('arts', 'arts.id', '=', 'comics.id')
            ->select('arts.*','comics.*')
            ->where('arts.author',$following[$i]->username)
            ->get();//get animations del following $i
            for($j=0; $j<sizeof($authorComics);$j++){
                for($k=0;$k<sizeof($authorComics[$j]->chapters);$k++){//get episodes de la animacion
                    $notification = new Notification(
                        $authorComics[$j]->chapters[$k]->created_at, 
                        $authorComics[$j]->chapters[$k]->name,
                        $authorComics[$j]->author, 
                        $following[$i]->profile_picture, 
                        "", 
                        $authorComics[$j]->chapters[$k]->id, 
                        $authorComics[$j]->id,
                        $authorComics[$j]->name,
                        2
                    );
                    
                    array_push($notifications,$notification);//insertar draw en la lista
                }   
            }

         }

        // //ordenamos de mas reciente a menos
         $notifications = collect($notifications)->sortBy('time')->reverse()->values();

        return response()->json([
            'notifications' => $notifications
        ],200); 
    }



    //================================================================================PUT
    //PARA TEAM PUT: editar la comprovacion que se haze en estos metodos del username

    public function putUserDescription(Request $request, $username){//actualizar user atributes

        if(!$userA = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $author = Author::find($username);
        if(!$author){//si no ha encontrado el draw con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }

        //importante realizar esta comprobacion en las PUT requests
        if($userA->username != $username){//si no es el mismo usuario que el que esta logeado, devolvemos error
            return response()->json(['message' => 'You are not the user'],404);//json con mensaje de error 404 not found
        }

        $author->description = $request->input('description');

        $author->save();
        return response()->json(['author' => $author],200);
    }

    public function putUserImage(Request $request, $username){//actualizar user atributes

        if(!$userA = JWTAuth::parseToken()->authenticate()){//authenticate() confirms that the token is valid 
            return response()->json(['message' => 'User not found'],404); //si no hay token o no es correcto lanza un error
        }

        $author = Author::find($username);
        if(!$author){//si no ha encontrado el draw con ese id
            return response()->json(['message' => 'User not found'],404);//json con mensaje de error 404 not found
        }

        //importante realizar esta comprobacion en las PUT requests
        if($userA->username != $username){//si no es el mismo usuario que el que esta logeado, devolvemos error
            return response()->json(['message' => 'You are not the user'],404);//json con mensaje de error 404 not found
        }

        $file = $request->file('photo');//Cogemos el file de la request

        $path = Storage::putfile('profileImages', $file);//cogemos el path con el nombre del file que laravel ha creado automaticamente

        $author->profile_picture = "Backend/storage/app/".$path;//le pasamos este path a la base de datos

        $author->save();
        return response()->json(['author' => $author],200);
    }

}
