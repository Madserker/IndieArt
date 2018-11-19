import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/User.interface';
import { AuthService } from '../../auth.service';
import { Draw } from '../../_models/Draw.interface';
import { Episode } from '../../_models/Episode.interface';
import { UsersService } from '../../users.service';
import { ListsService } from '../../lists.service';
import { Notification } from '../../_models/Notification.interface';

@Component({
  selector: 'app-friends-activity-view',
  templateUrl: './friends-activity-view.component.html',
  styleUrls: ['./friends-activity-view.component.less'],
  providers: [AuthService, ListsService, UsersService]
})
export class FriendsActivityViewComponent implements OnInit {

  currentUser : User;

  // drawsList : Draw [] = [];
  // episodesList : Episode [] = [];
  // chaptersList : Chapter [] = [];

  notifications : Notification [] = [];
  

  constructor(private listsService : ListsService, private userService : UsersService, private authService : AuthService) {
    this.getUser();
  }

  ngOnInit() {
    // this.userService.getFollowingUsersDraws(this.currentUser.username).subscribe(result => {
    //   //this.drawsList = result as Draw[]
    //   for(let draw of result){
    //     this.drawsList.push(draw)
    //   }
    // })
    // this.listsService.getUserDraws(this.currentUser.username).subscribe(result => {
    //   for(let draw of result){
    //     this.drawsList.push(draw)
    //   }
    // })


    this.userService.getNotifications(this.currentUser.username).subscribe(result => {
      this.notifications = result as Notification [];
      console.log(this.notifications);
    })
  }

  getUser(){
    if(JSON.parse(this.authService.getUser())==null){
    }
    else{
      this.currentUser = JSON.parse(this.authService.getUser())[0];//cogemos el usuario del localStorage
    }
  }

}
