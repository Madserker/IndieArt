import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../_models/Team.interface';

@Component({
  selector: 'app-team-image',
  templateUrl: './team-image.component.html',
  styleUrls: ['./team-image.component.less']
})
export class TeamImageComponent implements OnInit {

  @Input() team: Team;

  constructor() { }

  ngOnInit() {
  }

  showText(){
    document.getElementById("text"+this.team.username.toString()).style.visibility="visible";
    
  }
  hideText(){
    document.getElementById("text"+this.team.username.toString()).style.visibility="hidden";
  }

}
