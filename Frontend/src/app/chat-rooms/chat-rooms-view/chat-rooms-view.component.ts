import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { User } from '../../_models/User.interface';

@Component({
  selector: 'app-chat-rooms-view',
  templateUrl: './chat-rooms-view.component.html',
  styleUrls: ['./chat-rooms-view.component.less']
})
export class ChatRoomsViewComponent implements OnInit {

  currentUser : User;

  constructor(private authService : AuthService) {
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

}
