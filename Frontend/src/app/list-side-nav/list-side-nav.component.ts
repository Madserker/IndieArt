import { Component, OnInit, Input, HostBinding, ViewChild, Output, EventEmitter } from '@angular/core';
import { ChangeFiltersService } from '../change-filters.service';
import { ListComponent } from '../list/list.component';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-list-side-nav',
  templateUrl: './list-side-nav.component.html',
  styleUrls: ['./list-side-nav.component.less']
})
export class ListSideNavComponent implements OnInit{
  
  @Output() orderScore = new EventEmitter();
  @Output() orderVisits = new EventEmitter();
  @Output() new = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() close = new EventEmitter();

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
    this.close.emit(null)
}


//EVENT EMITTER FUNCTIONS=====
orderByScore(){
    this.orderScore.emit(null)
    this.closeNav()
  }
  orderByVisits(){
    this.orderVisits.emit(null)
    this.closeNav()
  }
  getNew(){
    this.new.emit(null)
    this.closeNav()
  }


  searchArt(form : NgForm){
    this.search.emit(form.value.search)
    this.closeNav()
  }
  

}


