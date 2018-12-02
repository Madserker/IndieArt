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
  members : TeamUser[];


  constructor(private lists : ListsService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.lists.getTeamUsers(this.team.username).subscribe(result => {
      this.members = result as TeamUser []

      for(let user of this.members){
        this.lists.getUserByUsername(user.user).subscribe(result=>{
          user._user = result
        })
      }
      })

  }

}
