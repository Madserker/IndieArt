import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './_models/User.interface';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface getUsers{
  followers : User[]
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

  followUser(follower_id : number, username_id : number){
    const token = this.authService.getToken();//recuperamos el token de la sesion
    const body = JSON.stringify(
      {
        "user_id":username_id,
        "follower_id":follower_id
      }
    );

    return this.http.post('http://localhost:8000/api/user/follow/?token=' + token, body, 
    {headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
      )
    });
  }

  unfollowUser(following_id : number, username_id : number){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.delete('http://localhost:8000/api/user/'+username_id+'/unfollow/'+following_id+'/?token=' + token,     {headers: new HttpHeaders(
      {'Accept': 'application/json',
      'Authorization':'Bearer'+ localStorage.token
    }
      )
    });
  }


  
}
