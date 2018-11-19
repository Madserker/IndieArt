import { Component, OnInit, Input } from '@angular/core';
import { Notification } from '../../_models/Notification.interface';

@Component({
  selector: 'app-friends-activity-list',
  templateUrl: './friends-activity-list.component.html',
  styleUrls: ['./friends-activity-list.component.less']
})
export class FriendsActivityListComponent implements OnInit {
  
  @Input() notifications : Notification [] = [];

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(){
    console.log(this.notifications);
  }

}
