<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function signup(Request $request){
        $this->validate($request,[//validamos el registro
        'username' => 'required', //el nombre es obligatorio
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
}
