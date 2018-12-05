import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../_models/Message.interface';

@Component({
  selector: 'app-chat-messages-list',
  templateUrl: './chat-messages-list.component.html',
  styleUrls: ['./chat-messages-list.component.less']
})
export class ChatMessagesListComponent implements OnInit {

  @Input() messages : Message[];

  constructor() { }

  ngOnInit() {
  }

}
