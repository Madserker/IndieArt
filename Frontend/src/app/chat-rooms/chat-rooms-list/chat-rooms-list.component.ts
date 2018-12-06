import { Component, OnInit, Input } from '@angular/core';
import { TeamChat } from '../../_models/TeamChat.interface';
import { ChatServiceService } from '../../chat-service.service';
import { User } from '../../_models/User.interface';
import { Chat } from '../../_models/Chat.interface';

@Component({
  selector: 'app-chat-rooms-list',
  templateUrl: './chat-rooms-list.component.html',
  styleUrls: ['./chat-rooms-list.component.less']
})
export class ChatRoomsListComponent implements OnInit {
  @Input() chats : Chat[]; 
  @Input() currentUser : User;
  // @Input() privateChats : PrivateChat[]; 
  // @Input() publicChats : PublicChat[]; 
  option = 1;
  constructor(private chatsService : ChatServiceService) { }

  ngOnInit() {
  }

  changeToTeamChats(){
        this.option=3;
        this.chatsService.getTeamChats(this.currentUser.username).subscribe(result => {
          this.chats = result as Chat [];
        })
  }
  changeToPrivateChats(){
    this.option=2;
    this.chatsService.getPrivateChats(this.currentUser.username).subscribe(result => {
      this.chats = result as Chat [];
    })
  }

  changeToPublicChats(){
    this.option=1;
    this.chatsService.getPublicChats(this.currentUser.username).subscribe(result => {
      this.chats = result as Chat [];
    })
  }

}
