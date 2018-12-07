import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../chat-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-public-chat',
  templateUrl: './new-public-chat.component.html',
  styleUrls: ['./new-public-chat.component.less']
})
export class NewPublicChatComponent implements OnInit {
  constructor(private chatService : ChatServiceService) { }

  ngOnInit() {
  }

  openForm(){
    document.getElementById('myModal8').style.display = "block"
}
closeForm(){
  document.getElementById('myModal8').style.display = "none"
}

createPublicChat(form : NgForm){
  this.chatService.postPublicChat(form.value.name,form.value.desc).subscribe(result=>{window.location.reload()})

}
}
