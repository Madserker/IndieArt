import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../_models/Team.interface';
import { User } from '../../_models/User.interface';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-team-view-image',
  templateUrl: './team-view-image.component.html',
  styleUrls: ['./team-view-image.component.less']
})
export class TeamViewImageComponent implements OnInit {

  @Input() team: Team;
  @Input() currentUser: User;

  followers : User [];

  alreadyFollowing:boolean = false
  
  constructor(private usersService : UsersService) { }

  ngOnInit() {
    console.log(this.currentUser)
    

  }

  ngOnChanges(){
    this.usersService.getFollowers(this.team.username).subscribe(result => {
      this.followers = result as User []

      //comprobamos si ya seguimos al usuario
      //si lo seguimos, no mostramos el boton de follow
      for(let user of this.followers){
        if(user.username == this.currentUser.username){
          this.alreadyFollowing = true
        }
      }
      })

  }

  followUser(){
    this.usersService.followUser(this.currentUser.username, this.team.username).subscribe(
      response =>  window.location.reload(),//si ha ido bien el login
      error => console.log(error)//si no ha ido bien el login
    );
  }
  unfollowUser(){
    this.usersService.unfollowUser(this.currentUser.username, this.team.username).subscribe(
      response =>  window.location.reload(),//si ha ido bien el login
      error => console.log(error)//si no ha ido bien el login
    );
  }
}
