/*

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Draw } from "./_models/Draw.interface";
import { map} from 'rxjs/operators';


@Injectable()
export class ListsService {
  constructor(private http: HttpClient) {

  }

  getDraws(): Observable<Draw[]>{
  //get: returns observable object
  //need to cast observable to interface Draw -> get<Draw[]>
    return this.http.get<Draw[]>('http://localhost:8000/api/draws').pipe(map(response=>response));


  }
}
*/
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Draw } from "./_models/Draw.interface";
import { Comic } from './_models/Comic.interface';
import { User } from './_models/User.interface';

//definimos interface para mapear la lista de dibujos
interface getDraws{
  draws: Draw[]
}
interface getComics{
  comics: Comic[]
}
interface getUsers{
  users: User[]
}
interface getDraw{
  draw: Draw
}
interface getUser{
  user: User
}

@Injectable()
export class ListsService {

  draws : Draw[]
 constructor(private http: HttpClient){}

 getDraws(): Observable<Draw[]> {

    return this.http.get<getDraws>('http://localhost:8000/api/draws')
    .pipe(
      map(res => res.draws as Draw[] || [])); 
  }

  getComics(): Observable<Comic[]>{
    return this.http.get<getComics>('http://localhost:8000/api/comics')
    .pipe(
      map(res => res.comics as Comic[] || [])); 
  }

  getUsers(): Observable<User[]>{
    return this.http.get<getUsers>('http://localhost:8000/api/users')
    .pipe(
      map(res => res.users as User[] || [])); 
  }

  //=================================================================================GetByPrimaryKey Methods


  getDrawById(id : number): Observable<Draw>{
    return this.http.get<getDraw>('http://localhost:8000/api/draw/'+id).pipe(
      map(res => res.draw as Draw)
    )
  }
  getUserByUsername(username : string): Observable<User>{
    return this.http.get<getUser>('http://localhost:8000/api/user/'+username).pipe(
      map(res => res.user as User)
    )
  }

  //=============================================================GetGallery
  getUserDraws(username : string): Observable<Draw[]> {
    return this.http.get<getDraws>('http://localhost:8000/api/user/draws/'+username)
    .pipe(
      map(res => res.draws as Draw[] || [])); 
  }
} 