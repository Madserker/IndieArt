<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

//CREAMOS LAS RUTAS DE LA API DEL BACKEND

//RUTAS PARA DRAW
Route::post('/draw',[
    'uses' => 'DrawController@postDraw',//usamos el metodo postDraw del DrawController
]);
Route::get('/draws',[
    'middleware' => 'cors',
    'uses' => 'DrawController@getDraws'
]);
//{id} es un parametro dinamico, el id del dibujo
Route::put('/draw/{id}',[
    'uses' => 'DrawController@putDraw',
]);
Route::delete('/draw/{id}',[
    'uses' => 'DrawController@deleteDraw',
]);

//RUTAS PARA LOGIN Y SIGN UP
Route::post('/user', [
    'uses' => 'UserController@signup'
]);
Route::post('/user/signin', [
    'uses' => 'UserController@signin'
]);
