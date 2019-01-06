import { Component, OnInit } from '@angular/core';
import { Author } from '../../../_models/Author.interface';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../../services/lists.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../_models/User.interface';
import { Team } from '../../../_models/Team.interface';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.less'],
  providers: [ListsService]
})
export class TeamViewComponent implements OnInit {

  team : Team;
  username : string;

  isCurrentUser : Boolean;

  currentUser : User;

  author: Author;

  constructor(private route: ActivatedRoute,private lists: ListsService, private authService : AuthService) {
    this.getUser();
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.username = params.username;
        //Cargamos otra vez el component cuando cambian los parametros de la ruta,
        //ya que una vez se inicia el componente, no se vuelve a ejecutar ngOnInit
        this.loadComponent();
      }
      
    )
  }

  loadComponent(){
    //cogemos el username de la ruta y buscamos en la base de datos el usuario con ese username
    this.lists.getTeamByUsername(this.username)
    .subscribe(result => {
    this.author = result as Author
    })
  }

  getUser(){
    if(JSON.parse(this.authService.getUser())==null){
    }
    else{
      this.currentUser = JSON.parse(this.authService.getUser());//cogemos el usuario del localStorage
      this.isCurrentUser=this.isCurrentUserOnTeam();
    }
  }

  isCurrentUserOnTeam(){
    return true;
  }



}
