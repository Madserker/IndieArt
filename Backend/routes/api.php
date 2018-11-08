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

//===========================================================================================RUTAS PARA DRAW
Route::post('/draw',[
    'uses' => 'DrawController@postDraw',//usamos el metodo postDraw del DrawController
]);
Route::get('/draws',[
    'middleware' => 'cors',
    'uses' => 'DrawController@getDraws'
]);
//{id} es un parametro dinamico, el id del dibujo
Route::get('/draw/{id}',[
    'middleware' => 'cors',
    'uses' => 'DrawController@getDrawById',
]);
Route::get('/user/draws/{author}',[
    'middleware' => 'cors',
    'uses' => 'DrawController@getDrawsByAuthor',
]);
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

//=====================================================================================RUTAS PARA COMIC
Route::post('/comic',[
    'uses' => 'ComicController@postComic',//usamos el metodo postDraw del DrawController
]);
Route::get('/comics',[
    'middleware' => 'cors',
    'uses' => 'ComicController@getComics'
]);
Route::get('/comic/{id}/chapters',[
    'middleware' => 'cors',
    'uses' => 'ComicController@getComicChapters'
]);
Route::get('/user/comics/{author}',[
    'middleware' => 'cors',
    'uses' => 'ComicController@getComicsByAuthor',
]);
Route::get('/comic/chapter/{id}/pages',[
    'middleware' => 'cors',
    'uses' => 'ChapterController@getChapterPages'
]);
//{id} es un parametro dinamico, el id del dibujo
Route::put('/comic/{id}',[
    'uses' => 'ComicController@putComics',
]);
Route::delete('/comic/{id}',[
    'uses' => 'ComicController@deleteComics',
]);

//====================================================================================RUTAS PARA ANIMATION
Route::get('/animations',[
    'middleware' => 'cors',
    'uses' => 'AnimationController@getAnimations',
]);

Route::get('/animation/{id}/episodes',[
    'middleware' => 'cors',
    'uses' => 'AnimationController@getAnimationEpisodes',
]);

Route::get('/user/animations/{author}',[
    'middleware' => 'cors',
    'uses' => 'AnimationController@getAnimationsByAuthor',
]);

//====================================================================================RUTAS PARA USER
Route::get('/users',[
    'middleware' => 'cors',
    'uses' => 'UserController@getUsers'
]);
Route::get('/user/{username}',[
    'middleware' => 'cors',
    'uses' => 'UserController@getUserByUsername'
]);

//=================================================================================RUTAS PARA COMMENTS
Route::get('/comments/draw/{id}',[
    'middleware' => 'cors',
    'uses' => 'CommentsController@getDrawComments'
]);
Route::get('/comments/comic/{id}',[
    'middleware' => 'cors',
    'uses' => 'CommentsController@getComicComments'
]);
Route::get('/comments/animation/{id}',[
    'middleware' => 'cors',
    'uses' => 'CommentsController@getAnimationComments'
]);

Route::post('/comment/draw',[
    'uses' => 'CommentsController@postDrawComment'
]);

Route::delete('/comment/draw/{id}',[
    'uses' => 'CommentsController@deleteDrawComment'
]);
