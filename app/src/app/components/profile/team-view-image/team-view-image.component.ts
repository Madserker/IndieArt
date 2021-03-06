import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../../_models/Team.interface';
import { User } from '../../../_models/User.interface';
import { UsersService } from '../../../services/users.service';
import { TeamUser } from '../../../_models/TeamUser.interface';
import { ListsService } from '../../../services/lists.service';

@Component({
  selector: 'app-team-view-image',
  templateUrl: './team-view-image.component.html',
  styleUrls: ['./team-view-image.component.less']
})
export class TeamViewImageComponent implements OnInit {

  @Input() team: Team;
  @Input() currentUser: User;

  followers : User [];

  teamUsers : TeamUser[];

  alreadyFollowing:boolean = false
  
  constructor(private listsService:ListsService, private usersService : UsersService) { }

  ngOnInit() {
    console.log(this.team)
    

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


      this.listsService.getTeamUsers(this.team.username).subscribe(result => {
        this.teamUsers = result as TeamUser []

        for(let user of this.teamUsers){
          this.listsService.getUserByUsername(user.user).subscribe(result=>{
            user._user = result
          })
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
