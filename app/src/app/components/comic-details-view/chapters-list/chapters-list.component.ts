import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../_models/User.interface';

@Component({
  selector: 'app-chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.less']
})
export class ChaptersListComponent implements OnInit {
  @Input() chapters : Chapter[]
  @Input() isCurrentUser : boolean
  @Input() currentUser : User
  
  constructor() { }

  ngOnInit() {
  }

}
