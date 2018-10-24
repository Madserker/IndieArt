import { Component, OnInit, ViewChild } from '@angular/core';
import { ListSideNavComponent } from '../list-side-nav/list-side-nav.component';
import { ChangeFiltersService } from '../change-filters.service';
import { Draw } from '../_models/Draw.interface';
import { DrawServiceService } from '../draw-service.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  providers: [DrawServiceService]
})
export class ListComponent implements OnInit {

  @ViewChild(ListSideNavComponent)
  private listSideNav: ListSideNavComponent;
  
  filters:string[];
  draws: Draw[] = [];

  constructor(private data: ChangeFiltersService, private drawService: DrawServiceService) { }


  ngOnInit() {
    this.data.currentFilters.subscribe(filters => this.filters=filters);
    this.drawService.getDraws()
    .subscribe(result => {
      this.draws = result as Draw[]
    })

    
  }



  changeToDrawFilters(){
    this.data.changeToDrawFilters();
    console.log(this.draws);
    
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
