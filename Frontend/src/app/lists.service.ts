import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Draw } from "./_models/Draw.interface";
import { Comic } from './_models/Comic.interface';
import { User } from './_models/User.interface';
import { A_Animation } from './_models/A_Animation.interface';
import { Episode } from './_models/Episode.interface';
import { Page } from './_models/Page.interface';
import { AuthService } from "./auth.service";
import {Headers} from '@angular/http';

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
interface getChapter{
  chapter: Chapter
}




@Injectable()
export class ListsService {


 constructor(private http: HttpClient, private authService: AuthService){}

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

  //====================================================================Upload
  uploadDraw(name:string,description:string,file:File,username:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    let formData:FormData = new FormData();
    formData.append('photo', file, file.name);
    formData.append('name',name);
    formData.append('descripcion', description);
    formData.append('author', username);

    let headers = new Headers();
  	        headers.append('Accept', 'application/json');
  	        headers.append('Authorization','Bearer ' + localStorage.token );
          
    //le pasamos el token para confirmar que estamos logeados
    return this.http.post('http://localhost:8000/api/draw/?token=' + token, formData, 
    {headers: new HttpHeaders(
      {'Accept': 'application/json',
      'Authorization':'Bearer'+ localStorage.token
    }
      )
    })
  }

  uploadComic(name:string,synopsis:string,file:File,username:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    let formData:FormData = new FormData();
    formData.append('photo', file, file.name);
    formData.append('name',name);
    formData.append('synopsis', synopsis);
    formData.append('author', username);

    let headers = new Headers();
  	        headers.append('Accept', 'application/json');
  	        headers.append('Authorization','Bearer ' + localStorage.token );
          
    //le pasamos el token para confirmar que estamos logeados
    return this.http.post('http://localhost:8000/api/comic/?token=' + token, formData, 
    {headers: new HttpHeaders(
      {'Accept': 'application/json',
      'Authorization':'Bearer'+ localStorage.token
    }
      )
    })
  }

  uploadAnimation(name:string,synopsis:string,file:File,username:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    let formData:FormData = new FormData();
    formData.append('photo', file, file.name);
    formData.append('name',name);
    formData.append('synopsis', synopsis);
    formData.append('author', username);

    let headers = new Headers();
  	        headers.append('Accept', 'application/json');
  	        headers.append('Authorization','Bearer ' + localStorage.token );
          
    //le pasamos el token para confirmar que estamos logeados
    return this.http.post('http://localhost:8000/api/animation/?token=' + token, formData, 
    {headers: new HttpHeaders(
      {'Accept': 'application/json',
      'Authorization':'Bearer'+ localStorage.token
    }
      )
    })
  }

  uploadEpisode(name:string,number:string,file:File,username:string, id:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    let formData:FormData = new FormData();
    formData.append('video', file, file.name);
    formData.append('name',name);
    formData.append('number', number);
    formData.append('author', username);
    formData.append('animation_id', id);

    let headers = new Headers();
  	        headers.append('Accept', 'application/json');
  	        headers.append('Authorization','Bearer ' + localStorage.token );
          
    //le pasamos el token para confirmar que estamos logeados
    return this.http.post('http://localhost:8000/api/animation/'+id+'/episode'+'/?token=' + token, formData, 
    {headers: new HttpHeaders(
      {'Accept': 'application/json',
      'Authorization':'Bearer'+ localStorage.token
    }
      )
    })
  }

  uploadChapter(name:string,number:string,fileList:File[],username:string, id:string){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    let formData:FormData = new FormData();
    // let count = 0;
    // for (let file of fileList) {//pasamos pagina a pagina, formData no acepta arrays
    //   formData.append('file'+count, file,file.name);
    //   count++;
    // }
    formData.append('name',name);
    formData.append('number', number);
    formData.append('author', username);
    formData.append('comic_id', id);

    let headers = new Headers();
  	        headers.append('Accept', 'application/json');
  	        headers.append('Authorization','Bearer ' + localStorage.token );
          
    //le pasamos el token para confirmar que estamos logeados
    return this.http.post<getChapter>('http://localhost:8000/api/comic/'+id+'/chapter'+'/?token=' + token, formData, 
    {headers: new HttpHeaders(
      {'Accept': 'application/json',
      'Authorization':'Bearer'+ localStorage.token
    }
      )
    })
  }

  uploadPage(id:string, number:number,file:File){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    let formData:FormData = new FormData();
    // let count = 0;
    // for (let file of fileList) {//pasamos pagina a pagina, formData no acepta arrays
    //   formData.append('file'+count, file,file.name);
    //   count++;
    // }
    formData.append('file',file,file.name);
    formData.append('number', number.toString());
    formData.append('chapter_id', id);

    let headers = new Headers();
  	        headers.append('Accept', 'application/json');
  	        headers.append('Authorization','Bearer ' + localStorage.token );
          
    //le pasamos el token para confirmar que estamos logeados
    return this.http.post('http://localhost:8000/api/comic/chapter/'+id+'/page'+'/?token=' + token, formData, 
    {headers: new HttpHeaders(
      {'Accept': 'application/json',
      'Authorization':'Bearer'+ localStorage.token
    }
      )
    })
  }



} 