import { Component, OnInit, Input } from '@angular/core';
import { Draw } from '../../../_models/Draw.interface';
import { Notification } from '../../../_models/Notification.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-friends-activity-notification',
  templateUrl: './friends-activity-notification.component.html',
  styleUrls: ['./friends-activity-notification.component.less']
})
export class FriendsActivityNotificationComponent implements OnInit {
  
  @Input() notification : Notification;

  constructor(private router : Router) { }

  ngOnInit() {
  }


  //SHORTCUTS
  openChapters(){
    this.router.navigateByUrl('comic/'+this.notification.parent_id+'/chapters');
  }
  openComic(){
    this.router.navigateByUrl('comic/'+this.notification.parent_id);
  }
  openDraw(){
    this.router.navigateByUrl('draw/'+this.notification.id);
  }
  openUser(){
    this.router.navigateByUrl('user/'+this.notification.username);
  }
  openAnimation(){
    this.router.navigateByUrl('animation/'+this.notification.parent_id);
  }
  openEpisodes(){
    this.router.navigateByUrl('animation/'+this.notification.parent_id+"/episodes");
  }
}
