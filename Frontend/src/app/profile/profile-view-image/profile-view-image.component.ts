import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User.interface';

@Component({
  selector: 'app-profile-view-image',
  templateUrl: './profile-view-image.component.html',
  styleUrls: ['./profile-view-image.component.less']
})
export class ProfileViewImageComponent implements OnInit {

  @Input() user: User;
  @Input() currentUser: User;
  
  constructor() { }

  ngOnInit() {
    console.log(this.currentUser)
  }

}
