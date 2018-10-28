import { Component, OnInit, ViewChild } from '@angular/core';
import { ListSideNavComponent } from '../list-side-nav/list-side-nav.component';
import { ChangeFiltersService } from '../change-filters.service';
import { Draw } from '../_models/Draw.interface';
import { DrawServiceService } from '../draw-service.service';
import { Comic } from '../_models/Comic.interface';


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
  option: number = 1;
  draws: Draw[] = [];
  comics: Comic[] = [];

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
    this.option=1;
    console.log(this.draws);
    
  }
  changeToUserFilters(){
    this.data.changeToUserFilters();
  }
  changeToMangaFilters(){
    this.data.changeToMangaFilters();
    this.option=2;
    this.drawService.getComics()
    .subscribe(result => {
      this.comics = result as Comic[]
    })
  }
  changeToAnimationFilters(){
    this.data.changeToAnimationFilters(); 
  }


  openNav(){		
    this.listSideNav.openNav();   
  }
}
