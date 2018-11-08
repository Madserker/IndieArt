import { Injectable } from '@angular/core';
import { DrawComment } from './_models/DrawComment.interface';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';


interface getDrawComments{
  comments : DrawComment[]
}

@Injectable()
export class CommentsService {

  
  constructor(private http: HttpClient){}
 
  getDrawComments(id : number): Observable<DrawComment[]> {
     return this.http.get<getDrawComments>('http://localhost:8000/api/comments/draw/'+id)
     .pipe(
       map(res => res.comments as DrawComment[] || [])); 
   }
   getComicComments(id : number): Observable<DrawComment[]> {
    return this.http.get<getDrawComments>('http://localhost:8000/api/comments/comic/'+id)
    .pipe(
      map(res => res.comments as DrawComment[] || [])); 
  }
  getAnimationComments(id : number): Observable<DrawComment[]> {
    return this.http.get<getDrawComments>('http://localhost:8000/api/comments/animation/'+id)
    .pipe(
      map(res => res.comments as DrawComment[] || [])); 
  }



  postDrawComment(draw_id,username,text){

    const body = JSON.stringify(
      {
        "draw_id" : draw_id, 
        "username" : username, 
        "text" : text
      }
    );
    return this.http.post('http://localhost:8000/api/comment/draw/', body, 
    {headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
      )
    })
  }

}
