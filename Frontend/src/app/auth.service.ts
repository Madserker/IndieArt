import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {

  constructor(private http: Http) { 

  }

  signup(username:string,email:string,password:string){
    return this.http.post('http://localhost:8000/api/user',{
      username:username,
      email:email,
      password:password
    },
    {headers: new Headers({'X-Request-Width':'XMLHttpRequest'})}
    );
  }

  signin(username:string,password:string){
    return this.http.post('http://localhost:8000/api/user/signin',{
      username:username,
      password:password
    },
    {headers: new Headers({'X-Request-Width':'XMLHttpRequest'})}).pipe(
    map(

      (response: Response) => {
        const token = response.json().token;
        localStorage.setItem('token', token);
        return {token: token};
      }
    ))


  }

getToken() {
  return localStorage.getItem('token');
}

}
