import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-side-nav',
  templateUrl: './login-side-nav.component.html',
  styleUrls: ['./login-side-nav.component.less']
})
export class LoginSideNavComponent implements OnInit {

  register : boolean = false;
  login : boolean = true;

  constructor() { }

  ngOnInit() {
  }

  noRefresh(){
    return false;
  }

  openLogin() {
    document.getElementById("sn").style.width = "250px";
    document.getElementById("sn").style.height = "300px";
    this.register=false;
    this.login=true;
}

  openRegister() {
    document.getElementById("sn").style.width = "250px";
    document.getElementById("sn").style.height = "400px";
    this.register=true;
    this.login=false;
}

 closeNav() {
    document.getElementById("sn").style.width = "0px";
    document.getElementById("sn").style.height = "0px";
}


}
