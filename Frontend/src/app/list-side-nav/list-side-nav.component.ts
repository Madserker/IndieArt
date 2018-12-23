import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChangeFiltersService } from '../change-filters.service';


@Component({
  selector: 'app-list-side-nav',
  templateUrl: './list-side-nav.component.html',
  styleUrls: ['./list-side-nav.component.less']
})
export class ListSideNavComponent implements OnInit{
  
  @Output() orderScore = new EventEmitter();
  @Output() orderVisits = new EventEmitter();
  
  @Output() applyFilter = new EventEmitter();

  @Output() new = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() close = new EventEmitter();

  filters:string [];
  selectedFilters:string[] = [];
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

//FILTERS FUNCTIONS 
toggleSelection(filter,event){//ADD OR REMOVE FILTERS ON SELECTED FILTERS LIST
  console.log(filter)
  if(this.selectedFilters.indexOf(filter) > -1){
    var index = this.selectedFilters.indexOf(filter);
    this.selectedFilters.splice(index,1);
    console.log(this.selectedFilters);
  }else{
    this.selectedFilters.push(filter);
    console.log(this.selectedFilters);
  }
  //SEND LIST TO LIST-COMPONENT
  this.applyFilter.emit(this.selectedFilters);
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


  onKey(event:any){
    this.search.emit(event.target.value)
  }
  

}


