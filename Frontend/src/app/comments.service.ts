import { Injectable } from '@angular/core';
import { DrawComment } from './_models/DrawComment.interface';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';

import { AuthService } from "./auth.service";
import { AnimationComment } from './_models/AnimationComment.interface';
import { Comment } from './_models/Comment.interface';
import { ComicComment } from './_models/ComicComment.interface';


interface getDrawComments{
  comments : DrawComment[]
}
interface getComicComments{
  comments : ComicComment[]
}
interface getAnimationComments{
  comments : AnimationComment[]
}
interface getComments{
  comments : Comment[]
}

@Injectable()
export class CommentsService {

  url = "http://192.168.1.66:8000" // serve --host 0.0.0.0
  //url = "http://localhost:8000" // localhost
  
  constructor(private http: HttpClient, private authService: AuthService){}
 
  getDrawComments(id : number): Observable<DrawComment[]> {
     return this.http.get<getDrawComments>(this.url+'/api/comments/draw/'+id)
     .pipe(
       map(res => res.comments as DrawComment[] || [])); 
   }
   getComicComments(id : number): Observable<ComicComment[]> {
    return this.http.get<getComicComments>(this.url+'/api/comments/comic/'+id)
    .pipe(
      map(res => res.comments as ComicComment[] || [])); 
  }
  getAnimationComments(id : number): Observable<AnimationComment[]> {
    return this.http.get<getAnimationComments>(this.url+'/api/comments/animation/'+id)
    .pipe(
      map(res => res.comments as AnimationComment[] || [])); 
  }

  getComments(id : number){
    return this.http.get<getComments>(this.url+'/api/comments/'+id)
    .pipe(
      map(res => res.comments as Comment[] || [])); 
  }
//=============================================================================================================POST COMMENT

  postDrawComment(draw_id,username,text) {

    const token = this.authService.getToken();//recuperamos el token de la sesion

    const body = JSON.stringify(
      {
        "draw_id" : draw_id, 
        "username" : username, 
        "text" : text
      }
    );
    //le pasamos el token para confirmar que estamos logeados
    return this.http.post(this.url+'/api/comment/draw/?token=' + token, body, 
    {headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
      )
    })
  }

  postComicComment(comic_id,username,text) {

    const token = this.authService.getToken();//recuperamos el token de la sesion

    const body = JSON.stringify(
      {
        "comic_id" : comic_id, 
        "username" : username, 
        "text" : text
      }
    );
    //le pasamos el token para confirmar que estamos logeados
    return this.http.post(this.url+'/api/comment/comic/?token=' + token, body, 
    {headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
      )
    })
  }

  postAnimationComment(animation_id,username,text){

    const token = this.authService.getToken();//recuperamos el token de la sesion

    const body = JSON.stringify(
      {
        "animation_id" : animation_id, 
        "username" : username, 
        "text" : text
      }
    );
    //le pasamos el token para confirmar que estamos logeados
    return this.http.post(this.url+'/api/comment/animation/?token=' + token, body, 
    {headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
      )
    })
  }


  //===============================================================================================================

  deleteDrawComment(id: number){
    const token = this.authService.getToken();
    return this.http.delete(this.url+'/api/comment/draw/' + id + '?token=' + token);
  }
  deleteComicComment(id: number){
    const token = this.authService.getToken();
    return this.http.delete(this.url+'/api/comment/comic/' + id + '?token=' + token);
  }
  deleteAnimationComment(id: number){
    const token = this.authService.getToken();
    return this.http.delete(this.url+'/api/comment/animation/' + id + '?token=' + token);
  }


}
