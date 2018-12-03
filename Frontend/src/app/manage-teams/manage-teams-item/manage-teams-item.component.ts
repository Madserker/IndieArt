import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../_models/Team.interface';
import { User } from '../../_models/User.interface';
import { ListsService } from '../../lists.service';
import { TeamUser } from '../../_models/TeamUser.interface';

@Component({
  selector: 'app-manage-teams-item',
  templateUrl: './manage-teams-item.component.html',
  styleUrls: ['./manage-teams-item.component.less']
})
export class ManageTeamsItemComponent implements OnInit {

  @Input() team : Team;
  @Input() currentUser : User;
  members : TeamUser[];
  isAdmin : boolean = false;


  constructor(private lists : ListsService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.lists.getTeamUsers(this.team.username).subscribe(result => {
      this.members = result as TeamUser []

      for(let user of this.members){
        if(user.user==this.currentUser.username && user.admin){
          this.isAdmin=true
        }
        this.lists.getUserByUsername(user.user).subscribe(result=>{
          user._user = result
        })
      }
      })
  }

  removeUser(member){
    this.lists.removeUserFromTeam(member,this.team.username).subscribe(result=>{

    })

  }



}
