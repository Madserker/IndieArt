import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './_models/User.interface';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthService {

  currentUser : User;
  // private UserSource = new BehaviorSubject<User>(this.currentUser);
  // currentUserObs = this.UserSource.asObservable();

  constructor(private http: Http) { 
/*
    if(JSON.parse(this.getUser())==null){
      console.log("1");
    }
    else{
      this.currentUser = JSON.parse(this.getUser())[0];//cogemos el usuario del localStorage
      console.log("2");
    }
*/
  }

  signup(username:string,email:string, birth:string, password:string){
    return this.http.post('http://localhost:8000/api/user',{
      username:username,
      email:email,
      birthday:birth,
      password:password
    },
    {headers: new Headers({'X-Request-Width':'XMLHttpRequest'})}
    ).pipe(
      map(
        (response : Response) => {
          const message = response.json().message;
          return {message:message};
        }
      )
    )
  }

  signin(username:string,password:string){
    return this.http.post('http://localhost:8000/api/user/signin',{
      username:username,
      password:password
    },
    {headers: new Headers({'X-Request-Width':'XMLHttpRequest'})}).pipe(
    map(
      (response: Response) => {
        //login correcto
        const token = response.json().token;
        const user = response.json().user;

        //guardamos token y usuario en memoria
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return {
          token: token
        };
      }
    ))


  }

getToken() {
  return localStorage.getItem('token');
}
getUser(){
  return localStorage.getItem('currentUser');
}

logout(){
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}

}
