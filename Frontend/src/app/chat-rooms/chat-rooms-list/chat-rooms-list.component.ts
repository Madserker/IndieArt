import { Component, OnInit, Input } from '@angular/core';
import { TeamChat } from '../../_models/TeamChat.interface';
import { ChatServiceService } from '../../chat-service.service';
import { User } from '../../_models/User.interface';

@Component({
  selector: 'app-chat-rooms-list',
  templateUrl: './chat-rooms-list.component.html',
  styleUrls: ['./chat-rooms-list.component.less']
})
export class ChatRoomsListComponent implements OnInit {
  @Input() teamChats : TeamChat[]; 
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
          this.teamChats = result as TeamChat [];
        })
  }
  changeToMangaFilters(){

  }

  changeToAnimationFilters(){

  }

}
