import { Component, OnInit, ViewChild } from '@angular/core';
import { ListSideNavComponent } from '../list-side-nav/list-side-nav.component';
import { ChangeFiltersService } from '../../services/change-filters.service';
import { Draw } from '../../_models/Draw.interface';
import { ListsService } from '../../services/lists.service';
import { Comic } from '../../_models/Comic.interface';
import { User } from '../../_models/User.interface';
import { A_Animation } from '../../_models/A_Animation.interface';
import { Router } from '@angular/router';
import { Team } from '../../_models/Team.interface';
import { TagsService } from '../../services/tags.service';


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

  selectedFilters = [];

  constructor(private tagService: TagsService, private data: ChangeFiltersService, private lists: ListsService,private router:Router) { }


  ngOnInit() {
    //this.data.currentFilters.subscribe(filters => this.filters=filters);
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
getSearchResults(text){
  if(this.option==1){
    if(text==""){
      this.lists.getDraws().subscribe(
        result => {
          this.draws = result
          this.selectedFilters=[];
        }
      );
    }else{
    this.lists.getDrawsSearchResults(text).subscribe(
      result => {
        this.draws = result
        this.selectedFilters=[];
      }
    );
    }
  }
  if(this.option==2){
    if(text==""){
      this.lists.getComics().subscribe(
        result => {
          this.comics = result
          this.selectedFilters=[];
        }
      );
    }else{
    this.lists.getComicsSearchResults(text).subscribe(
      result => {
        this.comics = result
        this.selectedFilters=[];
      }
    );
    }
  }
  if(this.option==3){
    if(text==""){
      this.lists.getAnimations().subscribe(
        result => {
          this.animations = result
          this.selectedFilters=[];
        }
        
      );
    }else{
    this.lists.getAnimationsSearchResults(text).subscribe(
      result => {
        this.animations = result
        this.selectedFilters=[];
      }
    );
    }
  }
  if(this.option==4){
    if(text==""){
      this.lists.getUsers().subscribe(
        result => this.users = result
      );
    }else{
    this.lists.getUsersSearchResults(text).subscribe(
      result => this.users = result
    );
    }
  }
  if(this.option==5){
    if(text==""){
      this.lists.getTeams().subscribe(
        result => this.teams = result
      );
    }else{
    this.lists.getTeamsSearchResults(text).subscribe(
      result => this.teams = result
    );
    }
  }

}

//EDIT TO NOT RELOAD THE ENTIRE LIST, INSTEAD USE THE CURRENT LIST
//OR GET THE LIST FROM BACKEND AND APPLY CURRENT FILTERS
  orderScore(){
    if(this.option==1){
      this.lists.getDrawsOrderedByScore().subscribe(
        result => 
        {
          this.draws = result
          //apply filters despues de ordenar
          this.applyFilter(this.selectedFilters);
        }

      );
    }
    if(this.option==2){
      this.lists.getComicsOrderedByScore().subscribe(
        result => 
        {
          this.comics = result
          //apply filters despues de ordenar
          this.applyFilter(this.selectedFilters);
        }
      );
    }
    if(this.option==3){
      this.lists.getAnimationsOrderedByScore().subscribe(
        result => 
        {
          this.animations = result
          //apply filters despues de ordenar
          this.applyFilter(this.selectedFilters);
        }
      );
    }

  }

  orderVisits(){
    if(this.option==1){
      this.lists.getDrawsOrderedByVisits().subscribe(
        result => 
        {
          this.draws = result
          //apply filters despues de ordenar
          this.applyFilter(this.selectedFilters);
        }
      );
    }
    if(this.option==2){
      this.lists.getComicsOrderedByVisits().subscribe(
        result => 
        {
          this.comics = result
          //apply filters despues de ordenar
          this.applyFilter(this.selectedFilters);
        }
      );
    }
    if(this.option==3){
      this.lists.getAnimationsOrderedByVisits().subscribe(
        result => 
        {
          this.animations = result
          //apply filters despues de ordenar
          this.applyFilter(this.selectedFilters);
        }
      );
    }
  }

  getNew(){
    if(this.option==1){
      this.lists.getDraws()
      .subscribe(result => {
        this.draws = result as Draw[]
        //apply filters despues de ordenar
        this.applyFilter(this.selectedFilters);
      })
    }
    if(this.option==2){
      this.lists.getComics()
      .subscribe(result => {
        this.comics = result as Comic[]
        //apply filters despues de ordenar
        this.applyFilter(this.selectedFilters);
      })
    }
    if(this.option==3){
      this.lists.getAnimations()
      .subscribe(result => {
        this.animations = result as A_Animation[]
        //apply filters despues de ordenar
        this.applyFilter(this.selectedFilters);
      })
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
     //rellenamos la lista de animaciones y la mostramos
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




  applyFilter(filters){
    this.selectedFilters = filters;
    var filtered = [];
    console.log(this.selectedFilters)
    //si no hay ningun filtro, hacer un get de todos
    if(filters.length == 0){
      if(this.option==1){    this.lists.getDraws()
        .subscribe(result => {
          this.draws = result as Draw[]
        })}
      if(this.option==2){    this.lists.getComics()
        .subscribe(result => {
          this.comics = result as Comic[]
        })}
      if(this.option==3){     this.lists.getAnimations()
        .subscribe(result => {
          this.animations = result as A_Animation[]
        })}
    }
    else{
    if(this.option==1){//draws
      for(let item of this.draws){//draw
        this.tagService.getTags(item.id).subscribe(//tags
          tags=>{
            for(let tag of tags){//tag
              if(filters.indexOf(tag.text) > -1){//tag in filters?
                filtered.push(item);
              }
            }
          }
        )
      }
      this.draws=filtered;
    }else if(this.option==2){
      for(let item of this.draws){
        this.tagService.getTags(item.id).subscribe(
          tags=>{
            for(let tag of tags){
              if(filters.indexOf(tag.text) > -1){//tag in filters?
                filtered.push(item);
              }
            }
          }
        )
      }
      this.comics = filtered;
    }else if(this.option==3){
      for(let item of this.draws){
        this.tagService.getTags(item.id).subscribe(
          tags=>{
            for(let tag of tags){
              if(filters.indexOf(tag.text) > -1){//tag in filters?
                filtered.push(item);
              }
            }
          }
        )
      }
      this.animations=filtered;
    }


  }
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
    this.router.navigateByUrl("user/"+username);
  }
  goToTeamProfile(username){
    this.router.navigateByUrl("team/"+username);
  }
}
