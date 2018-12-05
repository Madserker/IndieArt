import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../lists.service';
import { AuthService } from '../../auth.service';
import { Chat } from '../../_models/Chat.interface';
import { User } from '../../_models/User.interface';
import { ChatServiceService } from '../../chat-service.service';

@Component({
  selector: 'app-chat-viewer',
  templateUrl: './chat-viewer.component.html',
  styleUrls: ['./chat-viewer.component.less']
})
export class ChatViewerComponent implements OnInit {

  chat : Chat;
chat_id : number;

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
        this.loadComponent();
      }
      
    )
  }

  loadComponent(){
  //   //cogemos el username de la ruta y buscamos en la base de datos el usuario con ese username
    this.chatService.getChat(this.chat_id)
    .subscribe(result => {
    this.chat = result as Chat
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
