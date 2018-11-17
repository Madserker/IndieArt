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
  
  constructor(private usersService : UsersService) { }

  ngOnInit() {
    console.log(this.currentUser)

  }

  ngOnChanges(){
    this.usersService.getFollowers(this.user.username).subscribe(result => {
      this.followers = result as User []
      })
  }

}
