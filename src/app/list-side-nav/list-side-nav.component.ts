import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { ToolbarNotLoggedComponent } from '../toolbar-not-logged/toolbar-not-logged.component';
import { ChangeFiltersService } from '../change-filters.service';

@Component({
  selector: 'app-list-side-nav',
  templateUrl: './list-side-nav.component.html',
  styleUrls: ['./list-side-nav.component.less']
})
export class ListSideNavComponent implements OnInit{
  
  

  filters:string [];
  constructor(private data: ChangeFiltersService) { }


  ngOnInit(): void {
    this.data.currentFilters.subscribe(filters => this.filters=filters);
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

 closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
}

}
