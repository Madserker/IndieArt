import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Tag } from '../_models/Tag.interface';
import { Injectable } from '@angular/core';

interface getTags{
  tags : Tag[]
}



@Injectable({
  providedIn: 'root'
})
export class TagsService {

  //url = "http://localhost:8000" // localhost
  url = "http://192.168.1.66:8000" // serve --host 0.0.0.0


 constructor(private http: HttpClient, private authService: AuthService){}
  
  getTags(art_id:number){

    return this.http.get<getTags>(this.url+'/api/art/'+art_id+'/tags')
    .pipe(
      map(res => res.tags as Tag[] || [])); 
  }

  addTag(art_id,tag){
    const token = this.authService.getToken();//recuperamos el token de la sesion
      //le pasamos el token para confirmar que estamos logeados
      return this.http.post(this.url+'/api/art/'+art_id+'/tag/'+tag, 
      {headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
        )
      })
  }

}
