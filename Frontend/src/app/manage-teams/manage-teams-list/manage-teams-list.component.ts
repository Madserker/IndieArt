import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../_models/Team.interface';

@Component({
  selector: 'app-manage-teams-list',
  templateUrl: './manage-teams-list.component.html',
  styleUrls: ['./manage-teams-list.component.less']
})
export class ManageTeamsListComponent implements OnInit {
@Input() teams :Team[];
  constructor() { }

  ngOnInit() {
  }

}
