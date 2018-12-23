import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from './_models/Tag.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface getTags{
  tags:Tag[];
}
@Injectable({
  providedIn: 'root'
})
export class GetTagsService {

  //url = "http://192.168.1.66:8000" // serve --host 0.0.0.0
  url = "http://localhost:8000" // localhost

 constructor(private http: HttpClient){}

  getDrawFilters(): Observable<Tag[]> {
    return this.http.get<getTags>(this.url+'/api/tags/1')
    .pipe(
      map(res => res.tags as Tag[] || [])); 
  }
  getComicFilters(): Observable<Tag[]> {
    return this.http.get<getTags>(this.url+'/api/tags/2')
    .pipe(
      map(res => res.tags as Tag[] || [])); 
  }
  getAnimationFilters(): Observable<Tag[]> {
    return this.http.get<getTags>(this.url+'/api/tags/3')
    .pipe(
      map(res => res.tags as Tag[] || [])); 
  }
}
