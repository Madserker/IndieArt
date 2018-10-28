import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeFiltersService } from '../change-filters.service';
import { LoginSideNavComponent } from '../login-side-nav/login-side-nav.component';
import { Router } from '@angular/router';
import { debug, debuglog } from 'util';
import { User } from '../_models/User.interface';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-toolbar-not-logged',
  templateUrl: './toolbar-not-logged.component.html',
  styleUrls: ['./toolbar-not-logged.component.less'],
  providers: [AuthService]
})
export class ToolbarNotLoggedComponent implements OnInit {

  @ViewChild(LoginSideNavComponent)
  private loginsidenav: LoginSideNavComponent;

  currentUser : User;

  constructor(private router:Router,protected authService:AuthService) { 
    this.getUser();//al iniciar o actualizar la pagina cogemos el usuario del local storage
  }

  ngOnInit() {

  }

getUser(){
  if(JSON.parse(this.authService.getUser())==null){
  }
  else{
    this.currentUser = JSON.parse(this.authService.getUser())[0];//cogemos el usuario del localStorage
  }
}

goToChatRooms(){
  this.router.navigateByUrl('/chat-rooms');
}

goToFriendsActivity(){
  this.router.navigateByUrl('/friends-activity');
}

goToCompetitions(){
  this.router.navigateByUrl('/competitions');
}

goToHome(){
  this.router.navigateByUrl('/');
}


  openLoginNav(){		
    this.loginsidenav.openLogin();	   
  }
  openRegisterNav(){		
    this.loginsidenav.openRegister();	   
  }

  logout(){
    this.loginsidenav.logout();
  }




}
