import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../_models/Team.interface';
import { User } from '../../_models/User.interface';

@Component({
  selector: 'app-manage-teams-list',
  templateUrl: './manage-teams-list.component.html',
  styleUrls: ['./manage-teams-list.component.less']
})
export class ManageTeamsListComponent implements OnInit {
@Input() teams :Team[];
@Input() currentUser :User;
  constructor() { }

  ngOnInit() {
  }

}
