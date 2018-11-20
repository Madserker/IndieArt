import { Component, OnInit, Input } from '@angular/core';
import { User } from '../_models/User.interface';

@Component({
  selector: 'app-team-image',
  templateUrl: './team-image.component.html',
  styleUrls: ['./team-image.component.less']
})
export class TeamImageComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

  showText(){
    document.getElementById("text"+this.user.username.toString()).style.visibility="visible";
    
  }
  hideText(){
    document.getElementById("text"+this.user.username.toString()).style.visibility="hidden";
  }

}
