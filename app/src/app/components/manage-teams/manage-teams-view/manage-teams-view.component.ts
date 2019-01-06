import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models/User.interface';
import { ListsService } from '../../../services/lists.service';
import { UsersService } from '../../../services/users.service';
import { Team } from '../../../_models/Team.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-manage-teams-view',
  templateUrl: './manage-teams-view.component.html',
  styleUrls: ['./manage-teams-view.component.less'],
  providers: [AuthService, ListsService, UsersService]
})
export class ManageTeamsViewComponent implements OnInit {


  currentUser : User;

  teams : Team[] = [];
  

  constructor(private listsService : ListsService, private userService : UsersService, private authService : AuthService) {
    this.getUser();
  }

  ngOnInit() {
    this.listsService.getUserTeams(this.currentUser.username).subscribe(result => {
      this.teams = result as Team [];
    })
  }

  getUser(){
    if(JSON.parse(this.authService.getUser())==null){
    }
    else{
      this.currentUser = JSON.parse(this.authService.getUser());//cogemos el usuario del localStorage
    }
  }

}
