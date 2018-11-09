import { Component, OnInit, Input } from '@angular/core';
import { A_Animation } from '../../_models/A_Animation.interface';

@Component({
  selector: 'app-animation-details',
  templateUrl: './animation-details.component.html',
  styleUrls: ['./animation-details.component.less']
})
export class AnimationDetailsComponent implements OnInit {

  @Input() animation : A_Animation;
  constructor() { }

  ngOnInit() {
  }

}
