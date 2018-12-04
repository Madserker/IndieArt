import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../_models/Chat.interface';

@Component({
  selector: 'app-chat-rooms-chat',
  templateUrl: './chat-rooms-chat.component.html',
  styleUrls: ['./chat-rooms-chat.component.less']
})
export class ChatRoomsChatComponent implements OnInit {
  
  @Input() chat : Chat;

  constructor() { }

  ngOnInit() {
  }

}
