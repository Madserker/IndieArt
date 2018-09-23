import { Component, OnInit } from '@angular/core';

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
