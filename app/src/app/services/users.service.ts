import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../_models/User.interface';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Draw } from '../_models/Draw.interface';
import { Episode } from '../_models/Episode.interface';
import { Notification } from '../_models/Notification.interface';

interface getUsers{
  followers : User[]
}
interface getDraws{
  draws : Draw[]
}
interface getEpisodes{
  episodes : Episode[]
}
interface getChapters{
  chapters : Chapter[]
}
interface getNotifications{
  notifications : Notification[]
}
interface getScore{
  score : number
}
interface getVisits{
  visits : number
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //url = "http://192.168.1.66:8000" // serve --host 0.0.0.0
  url = "http://localhost:8000" // localhost

  constructor(private http: HttpClient, private authService: AuthService){}


  getFollowers(username : String){
    return this.http.get<getUsers>(this.url+'/api/user/'+username+'/followers')
    .pipe(
      map(res => res.followers as User[] || [])); 
  }

  getFollowing(username : String){
    return this.http.get<getUsers>(this.url+'/api/user/'+username+'/following')
    .pipe(
      map(res => res.followers as User[] || [])); 
  }

  followUser(follower : string, username : string){
    const token = this.authService.getToken();//recuperamos el token de la sesion
    const body = JSON.stringify(
      {
        "username":username,
        "follower":follower
      }
    );

    return this.http.post(this.url+'/api/user/follow/?token=' + token, body, 
    {headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
      )
    });
  }

  unfollowUser(following : string, username : string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.delete(this.url+'/api/user/'+username+'/unfollow/'+following+'/?token=' + token,     {headers: new HttpHeaders(
      {'Accept': 'application/json',
      'Authorization':'Bearer'+ localStorage.token
    }
      )
    });
  }



  //======================================================================================FRIENDS ACTIVITY
  getFollowingUsersDraws(username:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.get<getDraws>(this.url+'/api/user/'+username+'/following/draws/?token=' + token, 
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
      map(res => res.draws as Draw[] || []));
  }

  getFollowingUsersEpisodes(username:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.get<getEpisodes>(this.url+'/api/user/'+username+'/following/episodes/?token=' + token, 
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
      map(res => res.episodes as Episode[] || []));
  }

  getFollowingUsersChapters(username:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.get<getChapters>(this.url+'/api/user/'+username+'/following/chapters/?token=' + token, 
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
      map(res => res.chapters as Chapter[] || []));
  }

  getNotifications(username:string): Observable<Notification[]>{
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.get<getNotifications>(this.url+'/api/user/'+username+'/notifications/?token=' + token, 
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
      map(res => res.notifications as Notification[] || []));
  }

  //===========================================================================================================editUser

  editUserDesc(description:string, username:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    const body = JSON.stringify(
      {
        "description" : description, 
      }
    );


    return this.http.put(this.url+'/api/user/'+username+'/description/?token=' + token, body, 
    {headers: new HttpHeaders(
      {'Content-Type': 'application/json',
      'Authorization':'Bearer'+ localStorage.token
    }
      )
    })
  }

  editUserImage(file:File, username:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    let formData:FormData = new FormData();
    formData.append('photo', file, file.name);
          
    //tenemos que hacer un post en vez de un put, ya que laravel no acepta formData en un PUT
    return this.http.post(this.url+'/api/user/'+username+'/image/?token=' + token, formData, 
    {headers: new HttpHeaders(
      {'Accept': 'application/json',
      'Authorization':'Bearer'+ localStorage.token
    }
      )
    })
  }
   
  //================================================================================== VISIT AND VOTE

  vote(art_id,username,score){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    const body = JSON.stringify(
      {
        "art_id" : art_id, 
        "username" : username,
        "score" : score
      }
    );

    return this.http.post(this.url+'/api/vote/?token=' + token, body, 
    {headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
      )
    })
  }

  getScore(art_id){
    return this.http.get<getScore>(this.url+'/api/score/'+art_id,
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
      map(res => res.score as number));
  }

  getUserScore(art_id,user){
    const token = this.authService.getToken();//recuperamos el token de la sesion
    return this.http.get<getScore>(this.url+'/api/'+art_id+'/score/'+user+'/?token='+token,
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
      map(res => res.score as number));
  }

  visit(art_id,username){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    const body = JSON.stringify(
      {
      "art_id":art_id,
      "username": username
      }
    );
    return this.http.post(this.url+'/api/visit/?token=' + token, body, 
    {headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
      )
    })
  }

  getVisits(art_id){
    return this.http.get<getVisits>(this.url+'/api/visits/'+art_id, 
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
      map(res => res.visits as number));
  }
  
}
