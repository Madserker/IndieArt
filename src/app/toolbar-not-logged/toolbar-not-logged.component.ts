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
  
  filters:string[];

  constructor(private router:Router, private data: ChangeFiltersService) { }

  ngOnInit() {
    this.data.currentFilters.subscribe(filters => this.filters=filters);
  }



goToWorkOffers(){
  this.router.navigateByUrl('/workOffers');
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





  changeToDrawFilters(){
    this.data.changeToDrawFilters();
    this.goToHome();
  }
  changeToUserFilters(){
    this.data.changeToUserFilters();
    this.goToHome();
  }
  changeToMangaFilters(){
    this.data.changeToMangaFilters();
    this.goToHome();
  }
  changeToAnimationFilters(){
    this.data.changeToAnimationFilters();
    this.goToHome();
  }




}
