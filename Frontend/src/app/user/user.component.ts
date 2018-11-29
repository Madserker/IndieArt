import { Component, OnInit, Input } from '@angular/core';
import { User } from '../_models/User.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {


  @Input() user: User;


  constructor() {

   }

  ngOnInit() {
  }


  showText(){
    document.getElementById("text"+this.user.username.toString()).style.visibility="visible";
    
  }
  hideText(){
    document.getElementById("text"+this.user.username.toString()).style.visibility="hidden";
  }
}
