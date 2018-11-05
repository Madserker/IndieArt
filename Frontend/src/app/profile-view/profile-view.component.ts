import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User.interface';
import { DrawServiceService } from '../draw-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.less'],
  providers: [DrawServiceService]
})
export class ProfileViewComponent implements OnInit {

  user : User;
  username : string;


  constructor(private route: ActivatedRoute,private drawService: DrawServiceService) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.username = params.username;
      }
    )
    this.drawService.getUserByUsername(this.username)
    .subscribe(result => {
    this.user = result[0] as User
    console.log(this.user)
    })

  }

}
