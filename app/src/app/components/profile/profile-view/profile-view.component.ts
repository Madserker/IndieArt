import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models/User.interface';
import { ListsService } from '../../../services/lists.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.less'],
  providers: [ListsService]
})
export class ProfileViewComponent implements OnInit {

  user : User;
  username : string;

  isCurrentUser : Boolean;

  currentUser : User;

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
    this.lists.getUserByUsername(this.username)
    .subscribe(result => {
    this.user = result as User
    })
  }

  getUser(){
    if(JSON.parse(this.authService.getUser())==null){
    }
    else{
      this.currentUser = JSON.parse(this.authService.getUser());//cogemos el usuario del localStorage
    }
  }


}
