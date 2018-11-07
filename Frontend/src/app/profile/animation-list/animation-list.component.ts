import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User.interface';

@Component({
  selector: 'app-animation-list',
  templateUrl: './animation-list.component.html',
  styleUrls: ['./animation-list.component.less']
})
export class AnimationListComponent implements OnInit {

  @Input() user : User;
  
  constructor() { }

  ngOnInit() {
  }

}
