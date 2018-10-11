import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeFiltersService } from '../change-filters.service';
import { LoginSideNavComponent } from '../login-side-nav/login-side-nav.component';
import { Router } from '@angular/router';
import { debug, debuglog } from 'util';



@Component({
  selector: 'app-toolbar-not-logged',
  templateUrl: './toolbar-not-logged.component.html',
  styleUrls: ['./toolbar-not-logged.component.less'],
})
export class ToolbarNotLoggedComponent implements OnInit {

  @ViewChild(LoginSideNavComponent)
  private loginsidenav: LoginSideNavComponent;

  constructor(private router:Router) { }

  ngOnInit() {
  }



goToChatRooms(){
  this.router.navigateByUrl('/chat-rooms');
}

goToFriendsActivity(){
  this.router.navigateByUrl('/friends-activity');
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




}
