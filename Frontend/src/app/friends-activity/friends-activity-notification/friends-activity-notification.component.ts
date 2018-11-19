import { Component, OnInit, Input } from '@angular/core';
import { Draw } from '../../_models/Draw.interface';
import { Notification } from '../../_models/Notification.interface';

@Component({
  selector: 'app-friends-activity-notification',
  templateUrl: './friends-activity-notification.component.html',
  styleUrls: ['./friends-activity-notification.component.less']
})
export class FriendsActivityNotificationComponent implements OnInit {
  
  @Input() notification : Notification;

  constructor() { }

  ngOnInit() {
  }

}
