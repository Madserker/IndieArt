import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login-side-nav',
  templateUrl: './login-side-nav.component.html',
  styleUrls: ['./login-side-nav.component.less'],
  providers: [AuthService]
})
export class LoginSideNavComponent implements OnInit {
  register : boolean = false;
  login : boolean = true;

  constructor(protected authService:AuthService) { }

  ngOnInit() {
  }

  loginUser(form: NgForm){

  }

  registerUser(form: NgForm){
    this.authService.signup(
      form.value.username,
      form.value.email,
      form.value.password
      ).subscribe(
        response => console.log(response),
        error => console.log(error)
      );

  }


  openLogin() {
    document.getElementById("sn").style.width = "250px";
    document.getElementById("sn").style.height = "295px";
    this.register=false;
    this.login=true;
}

  openRegister() {
    document.getElementById("sn").style.width = "250px";
    document.getElementById("sn").style.height = "430px";
    this.register=true;
    this.login=false;
}

 closeNav() {
    document.getElementById("sn").style.width = "0px";
    document.getElementById("sn").style.height = "0px";
}


}
