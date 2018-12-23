import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TagsService } from './tags.service';
import { GetTagsService } from './get-tags.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeFiltersService {

  //definimos las listas con los filtros disponibles
  drawFilters:string[] = [];
  mangaFilters:string[] = [];
  userFilters:string[] = ["Manga Artists","Animators","Draw Artist"];
  animationFilters:string[] = [];

  private filtersSource = new BehaviorSubject<string []>(this.drawFilters);
  currentFilters = this.filtersSource.asObservable();

  //changeMessage cambia los filtros actuales por los que recibe por parametros
  private changeMessage(filters:string[]){
    this.filtersSource.next(filters);
  }

  //metodos que usaran los componentes que usan este servixio para cambiar los filtros
  changeToDrawFilters(){
    this.changeMessage(this.drawFilters);
  }
  changeToUserFilters(){
    this.changeMessage(this.userFilters);
  }
  changeToMangaFilters(){
    this.changeMessage(this.mangaFilters);
  }
  changeToAnimationFilters(){
    this.changeMessage(this.animationFilters);
  }

  constructor(private getTags:GetTagsService) {
    //use another service to get the real tags from the database
    this.getTags.getDrawFilters().subscribe(res=>{
      for(let tag of res){
        this.drawFilters.push(tag.text)
      }
    })
    this.getTags.getComicFilters().subscribe(res=>{
      for(let tag of res){
        this.mangaFilters.push(tag.text)
      }
    })
    this.getTags.getAnimationFilters().subscribe(res=>{
      for(let tag of res){
        this.animationFilters.push(tag.text)
      }
    })
  }
}
