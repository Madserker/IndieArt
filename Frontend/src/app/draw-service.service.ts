/*

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Draw } from "./_models/Draw.interface";
import { map} from 'rxjs/operators';


@Injectable()
export class DrawServiceService {
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
import { map} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Draw } from "./_models/Draw.interface";
    

@Injectable()
export class DrawServiceService {
 constructor(private http: HttpClient){}

 getDraws(): Observable<Draw[]> {
    // base URL should not have ? in it at the en
    return this.http.get('http://localhost:8000/api/draws')
    .pipe(
  map(res => res.draws as Draw[] || [])); 
   // in case that the property results in the res POJO doesnt exist (res.results returns null) then return empty array ([])
  }
} 