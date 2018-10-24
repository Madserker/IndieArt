/*import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Draw } from '../app/_models/Draw.interface';



@Injectable()
export class DrawServiceService {
  constructor(private http: HttpClient) {

  }

  

  getDraws(): Observable<any> {
    console.log(this.http.get('http://localhost:8000/api/draws'));
    return this.http.get<Draw []>('http://localhost:8000/api/draws');
  }
}

*/

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Draw } from "./_models/Draw.interface";

@Injectable()
export class DrawServiceService {
  constructor(private http: HttpClient) {

  }

  getDraws(): Observable<Draw[]>{
  //get: returns observable object
  //need to cast observable to interface Draw -> get<Draw[]>
    console.log(this.http.get<Draw[]>('http://localhost:8000/api/draws'));
    return this.http.get<Draw[]>('http://localhost:8000/api/draws');

  }
}