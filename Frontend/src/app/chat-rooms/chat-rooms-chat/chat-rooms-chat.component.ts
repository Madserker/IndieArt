import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../_models/Chat.interface';
import { ListsService } from '../../lists.service';
import { Router } from '@angular/router';
import { ChatServiceService } from '../../chat-service.service';
import { User } from '../../_models/User.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat-rooms-chat',
  templateUrl: './chat-rooms-chat.component.html',
  styleUrls: ['./chat-rooms-chat.component.less'],
  providers: [ListsService]
})
export class ChatRoomsChatComponent implements OnInit {
  
  @Input() chat : Chat;
  @Input() private:boolean = false;
  @Input() currentUser:User;
  image = '';
  constructor(private chatService : ChatServiceService, private lists : ListsService, private router:Router) { }

  ngOnInit() {

  }
  ngOnChanges(){
    //cogemos la imagen del perfil del equipo y la usamos de background
    this.lists.getTeamByUsername(this.chat.name).subscribe(
      result=>this.image=result.profile_picture
    );
  }
  openChat(){
    this.router.navigateByUrl('/chat-rooms/'+this.chat.id);
  }

  addMember(form : NgForm){
    console.log(this.chat.id)
    console.log(form.value.member)
    this.chatService.addMember(form.value.member,this.chat.id).subscribe(result=>{
      window.location.reload()
    })
  }

}
