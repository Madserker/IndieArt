import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './_models/User.interface';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Draw } from './_models/Draw.interface';
import { Episode } from './_models/Episode.interface';
import { Notification } from './_models/Notification.interface';

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

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  constructor(private http: HttpClient, private authService: AuthService){}


  getFollowers(username : String){
    return this.http.get<getUsers>('http://localhost:8000/api/user/'+username+'/followers')
    .pipe(
      map(res => res.followers as User[] || [])); 
  }

  getFollowing(username : String){
    return this.http.get<getUsers>('http://localhost:8000/api/user/'+username+'/following')
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

    return this.http.post('http://localhost:8000/api/user/follow/?token=' + token, body, 
    {headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
      )
    });
  }

  unfollowUser(following : string, username : string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.delete('http://localhost:8000/api/user/'+username+'/unfollow/'+following+'/?token=' + token,     {headers: new HttpHeaders(
      {'Accept': 'application/json',
      'Authorization':'Bearer'+ localStorage.token
    }
      )
    });
  }



  //======================================================================================FRIENDS ACTIVITY
  getFollowingUsersDraws(username:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.get<getDraws>('http://localhost:8000/api/user/'+username+'/following/draws/?token=' + token, 
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
      map(res => res.draws as Draw[] || []));
  }

  getFollowingUsersEpisodes(username:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.get<getEpisodes>('http://localhost:8000/api/user/'+username+'/following/episodes/?token=' + token, 
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
      map(res => res.episodes as Episode[] || []));
  }

  getFollowingUsersChapters(username:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.get<getChapters>('http://localhost:8000/api/user/'+username+'/following/chapters/?token=' + token, 
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
      map(res => res.chapters as Chapter[] || []));
  }

  getNotifications(username:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.get<getNotifications>('http://localhost:8000/api/user/'+username+'/notifications/?token=' + token, 
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(
      map(res => res.notifications as Notification[] || []));
  }


  
}
