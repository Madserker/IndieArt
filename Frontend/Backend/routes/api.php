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
    'middleware' => 'cors',
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

//=================================================================================RUTAS PARA LOGIN Y SIGN UP
Route::post('/user', [
    'uses' => 'UserController@signup'
]);

Route::post('/user/signin', [
    'uses' => 'UserController@signin'
]);

//=====================================================================================RUTAS PARA COMIC
Route::post('/comic',[
    'middleware' => 'cors',
    'uses' => 'ComicController@postComic',
]);

Route::post('/comic/{id}/chapter',[
    'middleware' => 'cors',
    'uses' => 'ChapterController@postChapter',
]);

Route::post('/comic/chapter/{id}/page',[
    'middleware' => 'cors',
    'uses' => 'PageController@postPage',
]);

Route::get('/comics',[
    'middleware' => 'cors',
    'uses' => 'ComicController@getComics'
]);

Route::get('/comic/{id}',[
    'middleware' => 'cors',
    'uses' => 'ComicController@getComicById'
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
    'uses' => 'ComicController@deleteComic',
]);

//====================================================================================RUTAS PARA ANIMATION
Route::post('/animation',[
    'middleware' => 'cors',
    'uses' => 'AnimationController@postAnimation',
]);

Route::get('/animations',[
    'middleware' => 'cors',
    'uses' => 'AnimationController@getAnimations',
]);

Route::get('/animation/{id}/episodes',[
    'middleware' => 'cors',
    'uses' => 'AnimationController@getAnimationEpisodes',
]);

Route::post('/animation/{id}/episode',[
    'middleware' => 'cors',
    'uses' => 'AnimationController@postEpisode',
]);

Route::get('/user/animations/{author}',[
    'middleware' => 'cors',
    'uses' => 'AnimationController@getAnimationsByAuthor',
]);

Route::get('/animation/{id}',[
    'middleware' => 'cors',
    'uses' => 'AnimationController@getAnimationById',
]);

Route::delete('/animation/{id}',[
    'middleware' => 'cors',
    'uses' => 'AnimationController@deleteAnimation',
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

Route::get('/user/{username}/followers',[
    'middleware' => 'cors',
    'uses' => 'UserController@getFollowers'
]);

Route::get('/user/{username}/following',[
    'middleware' => 'cors',
    'uses' => 'UserController@getFollowing'
]);

Route::post('/user/follow',[
    'middleware' => 'cors',
    'uses' => 'UserController@follow'
]);

Route::delete('/user/{username}/unfollow/{following}',[
    'middleware' => 'cors',
    'uses' => 'UserController@unfollow',
]);

Route::get('/user/{username}/following/draws',[
    'middleware' => 'cors',
    'uses' => 'UserController@getFollowingUsersDraws',
]);

Route::get('/user/{username}/following/episodes',[
    'middleware' => 'cors',
    'uses' => 'UserController@getFollowingUsersEpisodes',
]);

Route::get('/user/{username}/following/chapters',[
    'middleware' => 'cors',
    'uses' => 'UserController@getFollowingUsersChapters',
]);

Route::get('/user/{username}/notifications',[
    'middleware' => 'cors',
    'uses' => 'UserController@getNotifications',
]);

Route::put('/user/{username}/description',[
    'middleware' => 'cors',
    'uses' => 'UserController@putUserDescription',
]);

Route::post('/user/{username}/image',[
    'middleware' => 'cors',
    'uses' => 'UserController@putUserImage',
]);
//=================================================================================RUTAS PARA COMMENTS

Route::get('/comments/{id}',[
    'middleware' => 'cors',
    'uses' => 'CommentsController@getComments'
]);

Route::post('/comment',[
    'uses' => 'CommentsController@postComment'
]);

Route::delete('/comment/{id}',[
    'uses' => 'CommentsController@deleteComment'
]);
//================================================================================RUTAS PARA SCORE Y VISITS

Route::get('/score/{id}',[
    'middleware' => 'cors',
    'uses' => 'ArtController@getScore'
]);

Route::post('/vote',[
    'middleware' => 'cors',
    'uses' => 'ArtController@vote'
]);

Route::get('/visits/{id}',[
    'middleware' => 'cors',
    'uses' => 'ArtController@getVisits'
]);

Route::get('/{id}/score/{user}',[
    'middleware' => 'cors',
    'uses' => 'ArtController@getUserScore'
]);

Route::post('/visit',[
    'middleware' => 'cors',
    'uses' => 'ArtController@visit'
]);

//============================================================================================== RUTAS PARA TEAM

Route::get('/teams',[
    'middleware' => 'cors',
    'uses' => 'TeamController@getTeams'
]);

Route::get('/team/{name}/users',[
    'middleware' => 'cors',
    'uses' => 'TeamController@getTeamUsers'
]);

Route::get('/team/{name}',[
    'middleware' => 'cors',
    'uses' => 'TeamController@getTeamByUsername'
]);

Route::get('/user/{name}/teams/',[
    'middleware' => 'cors',
    'uses' => 'TeamController@getUserTeams'
]);

Route::post('/team',[
    'middleware' => 'cors',
    'uses' => 'TeamController@createTeam'
]);

Route::delete('/team/{team}/user/{user}',[
    'middleware' => 'cors',
    'uses' => 'TeamController@removeUserFromTeam'
]);

Route::delete('/team/{team}',[
    'middleware' => 'cors',
    'uses' => 'TeamController@deleteTeam'
]);

Route::post('/team/user',[
    'middleware' => 'cors',
    'uses' => 'TeamController@postUserToTeam'
]);

Route::put('/team/{team}/user/{user}/admin',[
    'middleware' => 'cors',
    'uses' => 'TeamController@promoteToAdmin'
]);

Route::put('/team/{team}/user/{user}/role/{role}',[
    'middleware' => 'cors',
    'uses' => 'TeamController@editRole'
]);

//=====================================================================================================CHAT
Route::post('/team-chat/{team}/{desc}',[
    'middleware' => 'cors',
    'uses' => 'ChatController@createTeamChat'
]);

Route::post('/private-chat/{name}/{desc}',[
    'middleware' => 'cors',
    'uses' => 'ChatController@createPrivateChat'
]);

Route::post('/public-chat/{name}/{desc}',[
    'middleware' => 'cors',
    'uses' => 'ChatController@createPublicChat'
]);

Route::get('/team-chats/{username}',[
    'middleware' => 'cors',
    'uses' => 'ChatController@getTeamChats'
]);

Route::get('/private-chats/{username}',[
    'middleware' => 'cors',
    'uses' => 'ChatController@getPrivateChats'
]);

Route::get('/public-chats/{username}',[
    'middleware' => 'cors',
    'uses' => 'ChatController@getPublicChats'
]);

Route::get('/chat/{id}',[
    'middleware' => 'cors',
    'uses' => 'ChatController@getChat'
]);

Route::get('/chat/{id}/messages',[
    'middleware' => 'cors',
    'uses' => 'ChatController@getMessages'
]);

Route::get('/chat/{id}/members',[
    'middleware' => 'cors',
    'uses' => 'ChatController@getChatMembers'
]);

Route::post('/chat/{id}/message',[
    'middleware' => 'cors',
    'uses' => 'ChatController@postMessage'
]);