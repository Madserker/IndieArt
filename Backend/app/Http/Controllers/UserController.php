<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class UserController extends Controller
{
    public function signup(Request $request){
        $this->validate($request,[//validamos el registro
        'username' => 'required|unique:users', //el nombre de usuario es obligatorio y unico en la tabla de usuarios
        'email' => 'required|email|unique:users', //el email tiene que ser obligatorio, formato email y unico en la tabla de usuarios
        'password' => 'required', //contraseña obligatoria
            ]);
        $user = new User([//creamos el usuario con los parametros del request
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
}
