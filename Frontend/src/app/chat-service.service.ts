import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { AuthService } from "./auth.service";

import { TeamChat } from './_models/TeamChat.interface';
import { Injectable } from '@angular/core';
import { Chat } from './_models/Chat.interface';
import { Message } from './_models/Message.interface';
import { User } from './_models/User.interface';
interface getTeamChats{
  teamChats : TeamChat[];
}
interface getChat{
  chat : Chat;
}
interface getMessages{
  messages:Message[]
}
interface getMembers{
  members:User[]
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

//======================================================================================================CHAT VIEWER
  getChat(id){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.get<getChat>(this.url+'/api/chat/'+id+'/?token='+token)
    .pipe(
      map(res => res.chat as Chat || [])); 
  }

  getChatMessages(id){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.get<getMessages>(this.url+'/api/chat/'+id+'/messages/?token='+token)
    .pipe(
      map(res => res.messages as Message[] || [])); 
  }
  
  getChatMembers(id){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    return this.http.get<getMembers>(this.url+'/api/chat/'+id+'/members/?token='+token)
    .pipe(
      map(res => res.members as User[] || [])); 
  }
//===================================================================================================
}

