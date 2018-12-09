import { Component, OnInit, ViewChild } from '@angular/core';
import { ListSideNavComponent } from '../list-side-nav/list-side-nav.component';
import { ChangeFiltersService } from '../change-filters.service';
import { Draw } from '../_models/Draw.interface';
import { ListsService } from '../lists.service';
import { Comic } from '../_models/Comic.interface';
import { User } from '../_models/User.interface';
import { A_Animation } from '../_models/A_Animation.interface';
import { Router } from '@angular/router';
import { Team } from '../_models/Team.interface';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  providers: [ListsService]
})
export class ListComponent implements OnInit {

  @ViewChild(ListSideNavComponent)
  private listSideNav: ListSideNavComponent;
  
  filters:string[];
  option: number = 1;
  draws: Draw[] = [];
  comics: Comic[] = [];
  animations: A_Animation[] = [];
  users: User[] = [];
  teams: Team[] = [];

  constructor(private data: ChangeFiltersService, private lists: ListsService,private router:Router) { }


  ngOnInit() {
    this.data.currentFilters.subscribe(filters => this.filters=filters);
    //rellenamos la lista de dibujos al iniciar el componente (default option = draws)
    this.lists.getDraws()
    .subscribe(result => {
      this.draws = result as Draw[]
    })    
  }



 closeNav() {
    document.getElementById("sidenavList").style.width = "0px";
}

//EVENT EMITTER FUNCTIONS=====
  orderScore(){
    if(this.option==1){
      this.lists.getDrawsOrderedByScore().subscribe(
        result => this.draws = result
      );
    }
    if(this.option==2){
      this.lists.getComicsOrderedByScore().subscribe(
        result => this.comics = result
      );
    }
    if(this.option==3){
      this.lists.getAnimationsOrderedByScore().subscribe(
        result => this.animations = result
      );
    }
  }

  orderVisits(){
    if(this.option==1){
      this.lists.getDrawsOrderedByVisits().subscribe(
        result => this.draws = result
      );
    }
    if(this.option==2){
      this.lists.getComicsOrderedByVisits().subscribe(
        result => this.comics = result
      );
    }
    if(this.option==3){
      this.lists.getAnimationsOrderedByVisits().subscribe(
        result => this.animations = result
      );
    }
  }

  getNew(){
    if(this.option==1){
      this.changeToDrawFilters()
    }
  }

  changeToDrawFilters(){
    this.data.changeToDrawFilters();
    this.option=1;
    this.lists.getDraws()
    .subscribe(result => {
      this.draws = result as Draw[]
    })
    
  }
  changeToUserFilters(){
    this.data.changeToUserFilters();
        //rellenamos la listade comics y la mostramos
        this.option=4;
        this.lists.getUsers()
        .subscribe(result => {
          this.users = result as User[]
        })
  }
  changeToMangaFilters(){
    this.data.changeToMangaFilters();
    //rellenamos la listade comics y la mostramos
    this.option=2;
    this.lists.getComics()
    .subscribe(result => {
      this.comics = result as Comic[]
    })
  }
  changeToAnimationFilters(){
    this.data.changeToAnimationFilters(); 
     //rellenamos la listade animaciones y la mostramos
     this.option=3;
     this.lists.getAnimations()
     .subscribe(result => {
       this.animations = result as A_Animation[]
     })
  }
  changeToTeamFilters(){
    this.data.changeToUserFilters(); 
     //rellenamos la listade animaciones y la mostramos
     this.option=5;
     this.lists.getTeams()
     .subscribe(result => {
       this.teams = result as Team[]
     })
  }

  openNav(){		
    this.listSideNav.openNav();   
    document.getElementById("sidenavList").style.width = "250px";
  }




  goToDrawDetails(id){
    this.router.navigateByUrl("draw/"+id);
  }
  goToComicDetails(id){
    this.router.navigateByUrl("comic/"+id);
  }
  goToAnimationDetails(id){
    this.router.navigateByUrl("animation/"+id);
  }
  goToProfile(username){
    this.router.navigateByUrl("team/"+username);
  }
}
