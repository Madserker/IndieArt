import { Injectable } from '@angular/core';
import { DrawComment } from './_models/DrawComment.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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

}
