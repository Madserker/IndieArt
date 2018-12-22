import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Tag } from './_models/Tag.interface';
import { Injectable } from '@angular/core';

interface getTags{
  tags : Tag[]
}



@Injectable({
  providedIn: 'root'
})
export class TagsService {

  url = "http://localhost:8000" // localhost

 constructor(private http: HttpClient, private authService: AuthService){}
  
  getTags(art_id:number){

    return this.http.get<getTags>(this.url+'/api/art/'+art_id+'/tags')
    .pipe(
      map(res => res.tags as Tag[] || [])); 
  }

}
