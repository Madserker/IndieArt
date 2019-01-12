import { Component, OnInit, ViewChild } from '@angular/core';
import { ListSideNavComponent } from '../list-side-nav/list-side-nav.component';
import { ChangeFiltersService } from '../../services/change-filters.service';
import { Draw } from '../../_models/Draw.interface';
import { Art } from '../../_models/Art.interface';
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
  selectedFilters = [];
  option: number = 1;

  draws: Draw[] = [];
  comics: Comic[] = [];
  animations: A_Animation[] = [];
  users: User[] = [];
  teams: Team[] = [];

  //lista con todos los elementos (not editable)
  all_items: Art[] = [];

  //lista con los elementos filtrados y ordenados (editable) (lista que se mostrara en la web)
  items: Art[] = [];

  constructor(private tagService: TagsService, private data: ChangeFiltersService, private lists: ListsService,private router:Router) { }


  ngOnInit() {
    //this.data.currentFilters.subscribe(filters => this.filters=filters);
    //rellenamos la lista de dibujos al iniciar el componente (default option = draws)
    this.lists.getDraws()
    .subscribe(result => {
      this.all_items = result as Draw[];
      this.items = this.all_items;
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
          this.items = result
          this.selectedFilters=[];
        }
      );
    }else{
    this.lists.getDrawsSearchResults(text).subscribe(
      result => {
        this.items = result
        this.selectedFilters=[];
      }
    );
    }
  }
  if(this.option==2){
    if(text==""){
      this.lists.getComics().subscribe(
        result => {
          this.items = result
          this.selectedFilters=[];
        }
      );
    }else{
    this.lists.getComicsSearchResults(text).subscribe(
      result => {
        this.items = result
        this.selectedFilters=[];
      }
    );
    }
  }
  if(this.option==3){
    if(text==""){
      this.lists.getAnimations().subscribe(
        result => {
          this.items = result
          this.selectedFilters=[];
        }
        
      );
    }else{
    this.lists.getAnimationsSearchResults(text).subscribe(
      result => {
        this.items = result
        this.selectedFilters=[];
      }
    );
    }
  }
  if(this.option==4){
    if(text==""){
      this.lists.getUsers().subscribe(
        result => this.items = result
      );
    }else{
    this.lists.getUsersSearchResults(text).subscribe(
      result => this.items = result
    );
    }
  }
  if(this.option==5){
    if(text==""){
      this.lists.getTeams().subscribe(
        result => this.items = result
      );
    }else{
    this.lists.getTeamsSearchResults(text).subscribe(
      result => this.items = result
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
          this.items = result
          //apply filters despues de ordenar
          this.applyFilter(this.selectedFilters);
        }

      );
    }
    if(this.option==2){
      this.lists.getComicsOrderedByScore().subscribe(
        result => 
        {
          this.items = result
          //apply filters despues de ordenar
          this.applyFilter(this.selectedFilters);
        }
      );
    }
    if(this.option==3){
      this.lists.getAnimationsOrderedByScore().subscribe(
        result => 
        {
          this.items = result
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
          this.items = result
          //apply filters despues de ordenar
          this.applyFilter(this.selectedFilters);
        }
      );
    }
    if(this.option==2){
      this.lists.getComicsOrderedByVisits().subscribe(
        result => 
        {
          this.items = result
          //apply filters despues de ordenar
          this.applyFilter(this.selectedFilters);
        }
      );
    }
    if(this.option==3){
      this.lists.getAnimationsOrderedByVisits().subscribe(
        result => 
        {
          this.items = result
          //apply filters despues de ordenar
          this.applyFilter(this.selectedFilters);
        }
      );
    }
  }

  getNew(){  
        this.items = this.all_items;
        //apply filters despues de ordenar
        this.applyFilter(this.selectedFilters);
      }

  changeToDrawFilters(){
    this.data.changeToDrawFilters();
    this.option=1;
    this.lists.getDraws()
    .subscribe(result => {
      this.all_items = result as Draw[];//cargamos la lista global
      this.items=this.all_items;//usamos la lista global
    })
    
  }
  changeToUserFilters(){
    this.data.changeToUserFilters();
        //rellenamos la listade comics y la mostramos
        this.option=4;
        this.lists.getUsers()
        .subscribe(result => {
          this.all_items = result as User[]
          this.items=this.all_items;

        })
  }
  changeToMangaFilters(){
    this.data.changeToMangaFilters();
    //rellenamos la listade comics y la mostramos
    this.option=2;
    this.lists.getComics()
    .subscribe(result => {
      this.all_items = result as Comic[]
      this.items=this.all_items;

    })
  }
  changeToAnimationFilters(){
    this.data.changeToAnimationFilters(); 
     //rellenamos la lista de animaciones y la mostramos
     this.option=3;
     this.lists.getAnimations()
     .subscribe(result => {
       this.all_items = result as A_Animation[]
       this.items=this.all_items;

     })
  }
  changeToTeamFilters(){
    this.data.changeToUserFilters(); 
     //rellenamos la listade animaciones y la mostramos
     this.option=5;
     this.lists.getTeams()
     .subscribe(result => {
       this.all_items = result as Team[]
       this.items=this.all_items;

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
          this.items = this.all_items
    }
    else{
      for(let item of this.all_items){//draw
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
      this.items=filtered;
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
