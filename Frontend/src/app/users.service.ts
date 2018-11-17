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


  
}
