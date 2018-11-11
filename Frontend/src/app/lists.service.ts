import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Draw } from "./_models/Draw.interface";
import { Comic } from './_models/Comic.interface';
import { User } from './_models/User.interface';
import { A_Animation } from './_models/A_Animation.interface';
import { Episode } from './_models/Episode.interface';
import { Page } from './_models/Page.interface';

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
interface getAnimations{
  animations: A_Animation[]
}
interface getDraw{
  draw: Draw
}
interface getAnimation{
  animation: A_Animation
}
interface getUser{
  user: User
}
interface getEpisodes{
  episodes: Episode[]
}
interface getChapters{
  chapters: Chapter[]
}
interface getPages{
  pages: Page[]
}
interface getComic{
  comic: Comic
}




@Injectable()
export class ListsService {


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

  getAnimations(): Observable<A_Animation[]>{
    return this.http.get<getAnimations>('http://localhost:8000/api/animations')
    .pipe(
      map(res => res.animations as A_Animation[] || [])); 
  }

  getUsers(): Observable<User[]>{
    return this.http.get<getUsers>('http://localhost:8000/api/users')
    .pipe(
      map(res => res.users as User[] || [])); 
  }

  getEpisodes(id): Observable<Episode[]>{
    return this.http.get<getEpisodes>('http://localhost:8000/api/animation/'+id+'/episodes')
    .pipe(
      map(res => res.episodes as Episode[] || [])); 
  }

  getChapters(id): Observable<Chapter[]>{
    return this.http.get<getChapters>('http://localhost:8000/api/comic/'+id+'/chapters')
    .pipe(
      map(res => res.chapters as Chapter[] || [])); 
  }

  getPages(id): Observable<Page[]>{
    return this.http.get<getPages>('http://localhost:8000/api/comic/chapter/'+id+'/pages')
    .pipe(
      map(res => res.pages as Page[] || [])); 
  }

  //=================================================================================GetByPrimaryKey Methods


  getDrawById(id : number): Observable<Draw>{
    return this.http.get<getDraw>('http://localhost:8000/api/draw/'+id).pipe(
      map(res => res.draw as Draw)
    )
  }
  getComicById(id : number): Observable<Comic>{
    return this.http.get<getComic>('http://localhost:8000/api/comic/'+id).pipe(
      map(res => res.comic as Comic)
    )
  }
  getAnimationById(id : number): Observable<A_Animation>{
    return this.http.get<getAnimation>('http://localhost:8000/api/animation/'+id).pipe(
      map(res => res.animation as A_Animation)
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

  getUserComics(username : string): Observable<Comic[]> {
    return this.http.get<getComics>('http://localhost:8000/api/user/comics/'+username)
    .pipe(
      map(res => res.comics as Comic[] || [])); 
  }

  getUserAnimations(username : string): Observable<A_Animation[]> {
    return this.http.get<getAnimations>('http://localhost:8000/api/user/animations/'+username)
    .pipe(
      map(res => res.animations as A_Animation[] || [])); 
  }
} 