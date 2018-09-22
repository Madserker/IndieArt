import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-list-side-nav',
  templateUrl: './list-side-nav.component.html',
  styleUrls: ['./list-side-nav.component.css']
})
export class ListSideNavComponent implements OnInit{
  ngOnInit(): void {
    
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

 closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
}

}
