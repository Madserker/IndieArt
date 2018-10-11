import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-side-nav',
  templateUrl: './login-side-nav.component.html',
  styleUrls: ['./login-side-nav.component.less']
})
export class LoginSideNavComponent implements OnInit {

  register : boolean = false;
  login : boolean = true;

  constructor(private _http: Http) { }
  private headers = new Headers({'Content-Type': 'application/json'});
  title = 'Laravel Angular 4 App';

  ngOnInit() {
  }

  noRefresh(form: NgForm){//envia el Form al backend
      console.log(form.value);
  }

  openLogin() {
    document.getElementById("sn").style.width = "250px";
    document.getElementById("sn").style.height = "295px";
    this.register=false;
    this.login=true;
}

  openRegister() {
    document.getElementById("sn").style.width = "250px";
    document.getElementById("sn").style.height = "402px";
    this.register=true;
    this.login=false;
}

 closeNav() {
    document.getElementById("sn").style.width = "0px";
    document.getElementById("sn").style.height = "0px";
}


}
