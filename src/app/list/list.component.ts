import { Component, OnInit, ViewChild } from '@angular/core';
import { ListSideNavComponent } from '../list-side-nav/list-side-nav.component';
import { ChangeFiltersService } from '../change-filters.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  @ViewChild(ListSideNavComponent)
  private listSideNav: ListSideNavComponent;
  
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


  openNav(){		
    this.listSideNav.openNav();   
  }
}
