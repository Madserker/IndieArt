import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User.interface';

@Component({
  selector: 'app-new-episode',
  templateUrl: './new-episode.component.html',
  styleUrls: ['./new-episode.component.less']
})
export class NewEpisodeComponent implements OnInit {

  @Input() currentUser:User
  
  constructor() { }

  ngOnInit() {
  }

}
