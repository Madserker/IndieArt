<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

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
            'ImagePath' => array_random($randomPic),//default image
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')) //bcrypt encripta la contraseña del usuario
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
}
