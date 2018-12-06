import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Chat } from '../../_models/Chat.interface';
import { User } from '../../_models/User.interface';
import { ChatServiceService } from '../../chat-service.service';
import { Message } from '../../_models/Message.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat-viewer',
  templateUrl: './chat-viewer.component.html',
  styleUrls: ['./chat-viewer.component.less']
})
export class ChatViewerComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  chat : Chat;
  chat_id : number;
  messages : Message[];

  currentUser : User;

  constructor(private chatService : ChatServiceService, private route: ActivatedRoute, private authService : AuthService) {
    this.getUser();
  }
  ngOnInit() {




    this.route.params.subscribe(
      params => {
        this.chat_id = params.id;
        //Cargamos otra vez el component cuando cambian los parametros de la ruta,
        //ya que una vez se inicia el componente, no se vuelve a ejecutar ngOnInit
        this.chatService.getChat(this.chat_id)
        .subscribe(result => {
        this.chat = result as Chat
        })
        
        this.loadComponent();

      }


    )



    this.chatService.socket.on('chat.message', function(message) {
      // just simple refresh, to keep secure
      this.loadComponent();
      
    }.bind(this));
  }

  scrollToBottom(): void {

    try {
          console.log("enter")
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  loadComponent(){
  //   //cogemos el username de la ruta y buscamos en la base de datos el usuario con ese username

    this.chatService.getChatMessages(this.chat_id).subscribe(
      result=>{
        this.messages = result as Message[]
        this.scrollToBottom();
      }
    )
  }

loadAndEmit(){
  this.loadComponent()
  this.chatService.emit()
}

  postMessage(form: NgForm){
    console.log(form.value.text)
    this.chatService.postMessage(
       form.value.text,
       this.chat_id
      ).subscribe(
        response => 
        this.loadAndEmit(),
        error => console.log(error)//si no ha ido bien el login
      );

    form.reset();
    }

  getUser(){
    if(JSON.parse(this.authService.getUser())==null){
    }
    else{
      this.currentUser = JSON.parse(this.authService.getUser());//cogemos el usuario del localStorage
    }
  }

}
