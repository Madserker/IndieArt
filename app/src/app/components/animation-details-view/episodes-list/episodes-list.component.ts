import { Component, OnInit, Input } from '@angular/core';
import { Episode } from '../../../_models/Episode.interface';
import { User } from '../../../_models/User.interface';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.less']
})
export class EpisodesListComponent implements OnInit {
  @Input() episodes : Episode[]
  @Input() isCurrentUser : boolean
  @Input() currentUser : User
  constructor() { }

  ngOnInit() {
  }

}
