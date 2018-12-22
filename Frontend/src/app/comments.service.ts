import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';

import { AuthService } from "./auth.service";
import { Comment } from './_models/Comment.interface';

interface getComments{
  comments : Comment[]
}

@Injectable()
export class CommentsService {

  //url = "http://192.168.1.66:8000" // serve --host 0.0.0.0
  url = "http://localhost:8000" // localhost
  
  constructor(private http: HttpClient, private authService: AuthService){}


  getComments(id : number){
    return this.http.get<getComments>(this.url+'/api/comments/'+id)
    .pipe(
      map(res => res.comments as Comment[] || [])); 
  }
//=============================================================================================================POST COMMENT

  postComment(id,username,text){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    const body = JSON.stringify(
      {
        "art_id" : id, 
        "username" : username, 
        "text" : text
      }
    );
    //le pasamos el token para confirmar que estamos logeados
    return this.http.post(this.url+'/api/comment/?token=' + token, body, 
    {headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
      )
    })
  }


  //===============================================================================================================
  deleteComment(id: number){
    const token = this.authService.getToken();
    return this.http.delete(this.url+'/api/comment/' + id + '?token=' + token);
  }


}
