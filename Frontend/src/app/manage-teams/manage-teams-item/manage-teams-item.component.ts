import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../_models/Team.interface';
import { User } from '../../_models/User.interface';
import { ListsService } from '../../lists.service';
import { TeamUser } from '../../_models/TeamUser.interface';
import { NgForm } from '@angular/forms';

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
    if(this.members.length<=1){//si somos el ultimo miembro se elimina el team
    this.lists.removeUserFromTeam(member.user,this.team.username).subscribe(result=>{
      this.lists.removeTeam(this.team.username).subscribe(result=>{
        window.location.reload()//si ha ido bien el delete
      })
    })
  }else{
    this.lists.removeUserFromTeam(member.user,this.team.username).subscribe(result=>{
        window.location.reload()//si ha ido bien el delete
    })
  }
}

  addMember(form: NgForm){
    this.lists.addUserToTeam(
      form.value.member,
      this.team.username
      ).subscribe(
        response =>  window.location.reload(),//si ha ido bien el login
        error => console.log(error)//si no ha ido bien el login
      );
  }



}
