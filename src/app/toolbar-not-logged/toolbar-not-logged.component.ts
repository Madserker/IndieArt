import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { ChangeFiltersService } from '../change-filters.service';



@Component({
  selector: 'app-toolbar-not-logged',
  templateUrl: './toolbar-not-logged.component.html',
  styleUrls: ['./toolbar-not-logged.component.less'],
})
export class ToolbarNotLoggedComponent implements OnInit {


  filters:string[];

  constructor(private data: ChangeFiltersService) { }

  ngOnInit() {
    this.data.currentFilters.subscribe(filters => this.filters=filters);
  }


  changeToDrawFilters(){
    this.data.changeToDrawFilters();
  }
  changeToUserFilters(){
    this.data.changeToUserFilters();
  }
  changeToMangaFilters(){
    this.data.changeToMangaFilters();
  }
  changeToAnimationFilters(){
    this.data.changeToAnimationFilters();
  }




}
