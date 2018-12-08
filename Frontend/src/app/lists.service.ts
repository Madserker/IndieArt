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
import { Team } from './_models/Team.interface';
import { TeamUser } from './_models/TeamUser.interface';

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
interface getTeams{
  teams: Team[]
}
interface getTeam{
  team: Team
}
interface getTeamUsers{
  users : TeamUser[]
}




@Injectable()
export class ListsService {

  url = "http://192.168.1.66:8000" // serve --host 0.0.0.0
  //url = "http://localhost:8000" // localhost

 constructor(private http: HttpClient, private authService: AuthService){}

 getDraws(): Observable<Draw[]> {

    return this.http.get<getDraws>(this.url+'/api/draws')
    .pipe(
      map(res => res.draws as Draw[] || [])); 
  }

  getDrawsOrderedByScore(): Observable<Draw[]> {

    return this.http.get<getDraws>(this.url+'/api/draws/ordered-score')
    .pipe(
      map(res => res.draws as Draw[] || [])); 
  }

  getDrawsOrderedByVisits(): Observable<Draw[]> {

    return this.http.get<getDraws>(this.url+'/api/draws/ordered-visits')
    .pipe(
      map(res => res.draws as Draw[] || [])); 
  }

  getComics(): Observable<Comic[]>{
    return this.http.get<getComics>(this.url+'/api/comics')
    .pipe(
      map(res => res.comics as Comic[] || [])); 
  }

  getAnimations(): Observable<A_Animation[]>{
    return this.http.get<getAnimations>(this.url+'/api/animations')
    .pipe(
      map(res => res.animations as A_Animation[] || [])); 
  }

  getUsers(): Observable<User[]>{
    return this.http.get<getUsers>(this.url+'/api/users')
    .pipe(
      map(res => res.users as User[] || [])); 
  }

  getEpisodes(id): Observable<Episode[]>{
    return this.http.get<getEpisodes>(this.url+'/api/animation/'+id+'/episodes')
    .pipe(
      map(res => res.episodes as Episode[] || [])); 
  }

  getChapters(id): Observable<Chapter[]>{
    return this.http.get<getChapters>(this.url+'/api/comic/'+id+'/chapters')
    .pipe(
      map(res => res.chapters as Chapter[] || [])); 
  }

  getPages(id): Observable<Page[]>{
    return this.http.get<getPages>(this.url+'/api/comic/chapter/'+id+'/pages')
    .pipe(
      map(res => res.pages as Page[] || [])); 
  }
//===================================================================================TEAMS

getTeamByUsername(username : string): Observable<Team>{
  return this.http.get<getTeam>(this.url+'/api/team/'+username).pipe(
    map(res => res.team as Team)
  )
}

getTeamUsers(username : string): Observable<TeamUser[]>{
  return this.http.get<getTeamUsers>(this.url+'/api/team/'+username+'/users').pipe(
    map(res => res.users as TeamUser[])
  )
}
  getTeams(): Observable<Team[]> {
    return this.http.get<getTeams>(this.url+'/api/teams')
    .pipe(
      map(res => res.teams as Team[] || [])); 
  }
  createTeam(name,description,role,file){
    const token = this.authService.getToken();//recuperamos el token de la sesion

    let formData:FormData = new FormData();
    formData.append('photo', file, file.name);
    formData.append('username',name);
    formData.append('description', description);
    formData.append('role', role);
          
    //le pasamos el token para confirmar que estamos logeados
    return this.http.post(this.url+'/api/team/?token=' + token, formData, 
    {headers: new HttpHeaders(
      {'Accept': 'application/json',
      'Authorization':'Bearer'+ localStorage.token
    }
      )
    })
  }
    getUserTeams($username){
      return this.http.get<getTeams>(this.url+'/api/user/'+$username+'/teams')
      .pipe(
        map(res => res.teams as Team[] || [])); 
    }
  
    removeUserFromTeam(member,team){
      const token = this.authService.getToken();
      return this.http.delete(this.url+'/api/team/' + team + '/user/'+member+'/?token=' + token);
    }
    
    removeTeam(team){
      const token = this.authService.getToken();
      return this.http.delete(this.url+'/api/team/' + team + '/?token=' + token);
    }

    addUserToTeam(member,team){
      const token = this.authService.getToken();//recuperamos el token de la sesion

      const body = JSON.stringify(
        {
          "user" : member, 
          "team" : team, 
          "role" : "undefined",
          "admin" : false
        }
      );
      //le pasamos el token para confirmar que estamos logeados
      return this.http.post(this.url+'/api/team/user/?token=' + token, body, 
      {headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
        )
      })
    }

    promoteToAdmin(username,team){
      const token = this.authService.getToken();//recuperamos el token de la sesion

  
      return this.http.put(this.url+'/api/team/'+team+'/user/'+username+'/admin/?token=' + token, 
      {headers: new HttpHeaders(
        {'Content-Type': 'application/json',
        'Authorization':'Bearer'+ localStorage.token
      }
        )
      })
    }

    editRole(username,team,role){
      const token = this.authService.getToken();//recuperamos el token de la sesion
      console.log(role)
      return this.http.put(this.url+'/api/team/'+team+'/user/'+username+'/role/'+role+'/?token=' + token, 
      {headers: new HttpHeaders(
        {'Content-Type': 'application/json',
        'Authorization':'Bearer'+ localStorage.token
      }
        )
      })
    }
  //=================================================================================GetByPrimaryKey Methods


  getDrawById(id : number): Observable<Draw>{
    return this.http.get<getDraw>(this.url+'/api/draw/'+id).pipe(
      map(res => res.draw as Draw)
    )
  }
  getComicById(id : number): Observable<Comic>{
    return this.http.get<getComic>(this.url+'/api/comic/'+id).pipe(
      map(res => res.comic as Comic)
    )
  }
  getAnimationById(id : number): Observable<A_Animation>{
    return this.http.get<getAnimation>(this.url+'/api/animation/'+id).pipe(
      map(res => res.animation as A_Animation)
    )
  }
  getUserByUsername(username : string): Observable<User>{
    return this.http.get<getUser>(this.url+'/api/user/'+username).pipe(
      map(res => res.user as User)
    )
  }



  //=============================================================GetGallery
  getUserDraws(username : string): Observable<Draw[]> {
    return this.http.get<getDraws>(this.url+'/api/user/draws/'+username)
    .pipe(
      map(res => res.draws as Draw[] || [])); 
  }

  getUserComics(username : string): Observable<Comic[]> {
    return this.http.get<getComics>(this.url+'/api/user/comics/'+username)
    .pipe(
      map(res => res.comics as Comic[] || [])); 
  }

  getUserAnimations(username : string): Observable<A_Animation[]> {
    return this.http.get<getAnimations>(this.url+'/api/user/animations/'+username)
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
    return this.http.post(this.url+'/api/draw/?token=' + token, formData, 
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
    return this.http.post(this.url+'/api/comic/?token=' + token, formData, 
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
    return this.http.post(this.url+'/api/animation/?token=' + token, formData, 
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
    return this.http.post(this.url+'/api/animation/'+id+'/episode'+'/?token=' + token, formData, 
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
    formData.append('name',name);
    formData.append('number', number);
    formData.append('author', username);
    formData.append('comic_id', id);

    let headers = new Headers();
  	        headers.append('Accept', 'application/json');
  	        headers.append('Authorization','Bearer ' + localStorage.token );
          
    //le pasamos el token para confirmar que estamos logeados
    return this.http.post<getChapter>(this.url+'/api/comic/'+id+'/chapter'+'/?token=' + token, formData, 
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
    formData.append('file',file,file.name);
    formData.append('number', number.toString());
    formData.append('chapter_id', id);

    let headers = new Headers();
  	        headers.append('Accept', 'application/json');
  	        headers.append('Authorization','Bearer ' + localStorage.token );
          
    //le pasamos el token para confirmar que estamos logeados
    return this.http.post(this.url+'/api/comic/chapter/'+id+'/page'+'/?token=' + token, formData, 
    {headers: new HttpHeaders(
      {'Accept': 'application/json',
      'Authorization':'Bearer'+ localStorage.token
    }
      )
    })
  }

  //==================================================================================DELETE

  deleteDraw(id: number){
    const token = this.authService.getToken();
    return this.http.delete(this.url+'/api/draw/' + id + '?token=' + token);
  }
  deleteComic(id: number){
    const token = this.authService.getToken();
    return this.http.delete(this.url+'/api/comic/' + id + '?token=' + token);
  }
  deleteAnimation(id: number){
    const token = this.authService.getToken();
    return this.http.delete(this.url+'/api/animation/' + id + '?token=' + token);
  }
} 