import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatServiceService } from '../../chat-service.service';

@Component({
  selector: 'app-new-private-chat',
  templateUrl: './new-private-chat.component.html',
  styleUrls: ['./new-private-chat.component.less']
})
export class NewPrivateChatComponent implements OnInit {

  constructor(private chatService : ChatServiceService) { }

  ngOnInit() {
  }

  openForm(){
    document.getElementById('myModal7').style.display = "block"
}
closeForm(){
  document.getElementById('myModal7').style.display = "none"
}

createPrivateChat(form : NgForm){
  console.log("in")
  this.chatService.postPrivateChat(form.value.name,form.value.desc).subscribe(result=>{window.location.reload()})

}


}
