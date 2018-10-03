import { Component, OnInit, Output, EventEmitter, Input, HostListener, ViewChild } from '@angular/core';
import { ChangeFiltersService } from '../change-filters.service';
import { LoginSideNavComponent } from '../login-side-nav/login-side-nav.component';



@Component({
  selector: 'app-toolbar-not-logged',
  templateUrl: './toolbar-not-logged.component.html',
  styleUrls: ['./toolbar-not-logged.component.less'],
})
export class ToolbarNotLoggedComponent implements OnInit {

  @ViewChild(LoginSideNavComponent)
  private loginsidenav: LoginSideNavComponent;
  
  filters:string[];

  constructor(private data: ChangeFiltersService) { }

  ngOnInit() {
    this.data.currentFilters.subscribe(filters => this.filters=filters);
  }


  openLoginNav(){		
    this.loginsidenav.openLogin();	   
  }
  openRegisterNav(){		
    this.loginsidenav.openRegister();	   
  }

  changeToDrawFilters(){
    this.data.changeToDrawFilters();
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




}
