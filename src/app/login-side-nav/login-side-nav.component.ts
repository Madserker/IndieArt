import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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

  constructor(private auth : AuthService) { }

  ngOnInit() {
  }

  loginUser(event){
    event.preventDefault();
    const username = event.target.querySelector('#username').value;
    const password = event.target.querySelector('#password').value;
    console.log(username,password);

    this.auth.getUserDetails(username,password).subscribe(data => {//subscribe-> cuando algun evento ocurre se llama a subscribe
      if(data.success){
        //redirect to user session
      }else{
        window.alert(data.message);
      }
    })
}
  registerUser(event){


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
