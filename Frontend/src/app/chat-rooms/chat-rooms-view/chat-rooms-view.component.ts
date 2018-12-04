import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User.interface';
import { TeamChat } from '../../_models/TeamChat.interface';
import { ChatServiceService } from '../../chat-service.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-chat-rooms-view',
  templateUrl: './chat-rooms-view.component.html',
  styleUrls: ['./chat-rooms-view.component.less']
})
export class ChatRoomsViewComponent implements OnInit {


  currentUser : User;

  teamChats : TeamChat[] = [];
  

  constructor(private chatsService : ChatServiceService, private authService : AuthService) {
    this.getUser();
  }

  ngOnInit() {
    this.chatsService.getTeamChats(this.currentUser.username).subscribe(result => {
      this.teamChats = result as TeamChat [];
    })
  }

  getUser(){
    if(JSON.parse(this.authService.getUser())==null){
    }
    else{
      this.currentUser = JSON.parse(this.authService.getUser());//cogemos el usuario del localStorage
    }
  }


}
