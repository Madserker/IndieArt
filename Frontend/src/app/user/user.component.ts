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
    console.log(this.user.id);
  }


  showText(){
    document.getElementById("text"+this.user.id.toString()).style.visibility="visible";
    
  }
  hideText(){
    document.getElementById("text"+this.user.id.toString()).style.visibility="hidden";
  }
}