import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { AuthService } from "./auth.service";

import { TeamChat } from './_models/TeamChat.interface';
import { Injectable } from '@angular/core';
interface getTeamChats{
  teamChats : TeamChat[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  url = "http://192.168.1.66:8000" // serve --host 0.0.0.0
  //url = "http://localhost:8000" // localhost

 constructor(private http: HttpClient, private authService: AuthService){}

 getTeamChats(username): Observable<TeamChat[]> {
  const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.get<getTeamChats>(this.url+'/api/team-chats/'+username+'/?token='+token)
    .pipe(
      map(res => res.teamChats as TeamChat[] || [])); 
  }

}

