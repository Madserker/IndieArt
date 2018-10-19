import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeFiltersService {

  //definimos las listas con los filtros disponibles
  drawFilters:string[] = ["Digital Art","Traditional Art","Fan Art","Photography","Contest Winners"];
  mangaFilters:string[] = ["Comic","Manga","Contest Winners","English","Spanish","Japanese"];
  userFilters:string[] = ["Manga Artists","Animators","Draw Artist","Contest Winners"];
  animationFilters:string[] = ["Short Animations","Long Animations","Serie","GIF","Film","Contest Winners"];

  private filtersSource = new BehaviorSubject<string []>(this.drawFilters);
  currentFilters = this.filtersSource.asObservable();

  //changeMessage cambia los filtros actuales por los que recibe por parametros
  private changeMessage(filters:string[]){
    this.filtersSource.next(filters);
  }

  //metodos que usaran los componentes que usan este servidio para cambiar los filtros
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

  constructor() { }
}
