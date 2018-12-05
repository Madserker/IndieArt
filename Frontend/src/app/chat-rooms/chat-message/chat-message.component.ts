import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../_models/Message.interface';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.less']
})
export class ChatMessageComponent implements OnInit {

  @Input() message : Message;
  constructor() { }

  ngOnInit() {
  }

}
