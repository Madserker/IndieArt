import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User.interface';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-profile-view-image',
  templateUrl: './profile-view-image.component.html',
  styleUrls: ['./profile-view-image.component.less']
})
export class ProfileViewImageComponent implements OnInit {

  @Input() user: User;
  @Input() currentUser: User;

  followers : User [];
  following : User [];

  alreadyFollowing:boolean = false
  
  constructor(private usersService : UsersService) { }

  ngOnInit() {
    console.log(this.currentUser)
    

  }

  ngOnChanges(){
    this.usersService.getFollowers(this.user.username).subscribe(result => {
      this.followers = result as User []

      //comprobamos si ya seguimos al usuario
      //si lo seguimos, no mostramos el boton de follow
      for(let user of this.followers){
        if(user.username == this.currentUser.username){
          this.alreadyFollowing = true
        }
      }
      })
    this.usersService.getFollowing(this.user.username).subscribe(result => {
        this.following = result as User []
      })

  }

  followUser(){
    this.usersService.followUser(this.currentUser.id, this.user.id).subscribe(
      response =>  window.location.reload(),//si ha ido bien el login
      error => console.log(error)//si no ha ido bien el login
    );
  }

}
