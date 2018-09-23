import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeFiltersService {

  drawFilters:string[] = ["Digital Art","Traditional Art"];
  mangaFilters:string[] = ["Comic","Manga","English","Spanish"];
  userFilters:string[] = ["Manga Artists","Animators","Draw Artist"];
  animationFilters:string[] = ["Short Animations","Long Animations","Serie"];

  private filtersSource = new BehaviorSubject<string []>(this.drawFilters);
  currentFilters = this.filtersSource.asObservable();

  changeMessage(filters:string[]){
    this.filtersSource.next(filters);
  }

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
