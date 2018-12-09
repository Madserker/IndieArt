import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-side-nav',
  templateUrl: './login-side-nav.component.html',
  styleUrls: ['./login-side-nav.component.less'],
  providers: [AuthService]
})
export class LoginSideNavComponent implements OnInit {
  register : boolean = false;

  constructor(private router:Router, protected authService:AuthService) { }

  ngOnInit() {
  }

  loginUser(form: NgForm){
    this.authService.signin(
      form.value.username,
      form.value.password
      ).subscribe(
        response =>  window.location.reload(),//si ha ido bien el login
        error => alert(error.json().error)//si no ha ido bien el login
      );
  }

  registerUser(form: NgForm){
    if(form.value.password == form.value.rpass){//comprobamos en el frontend si coinciden las contraseñas  
      this.authService.signup(
        form.value.username,
        form.value.email,
        form.value.name,
        form.value.birth,
        form.value.password
        ).subscribe(
          response => { window.location.reload(),this.closeNav()},//si ha ido bien el registro
          error => alert(error.json().message)//si no ha ido bien el registro
      );
    }
  }

  logout(){
    this.authService.logout();
    window.location.reload();
  }

  openLogin() {
    document.getElementById("sn").style.width = "250px";
    document.getElementById("sn").style.height = "310px";
    this.register=false;
}

  openRegister() {
    document.getElementById("sn").style.width = "250px";
    document.getElementById("sn").style.height = "560px";
    this.register=true;
}

 closeNav() {
    document.getElementById("sn").style.width = "0px";
    document.getElementById("sn").style.height = "0px";
}


}
