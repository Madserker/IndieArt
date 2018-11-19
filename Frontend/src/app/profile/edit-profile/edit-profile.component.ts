import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User.interface';
import { AuthService } from '../../auth.service';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.less']
})
export class EditProfileComponent implements OnInit {
  currentUser:User;
  file:File;
  constructor(private authService: AuthService,private userService : UsersService) { 
    this.getUser();
  }

  ngOnInit() {

  }
  getUser(){
    if(JSON.parse(this.authService.getUser())==null){
    }
    else{
      this.currentUser = JSON.parse(this.authService.getUser())[0];//cogemos el usuario del localStorage
    }
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        this.file = fileList[0];
    }
  }
  
  editDesc(form: NgForm){
    console.log(this.file)
    this.userService.editUserDesc(
      form.value.desc,
      this.currentUser.username
      ).subscribe(
        response => window.location.reload(),//si ha ido bien el login
        error => console.log(error)//si no ha ido bien el login
      );
  }

  editImage(form: NgForm){
    console.log(this.file)
    this.userService.editUserImage(
      this.file,
      this.currentUser.username
      ).subscribe(
        response => window.location.reload(),//si ha ido bien el login
        error => console.log(error)//si no ha ido bien el login
      );
  }
}
