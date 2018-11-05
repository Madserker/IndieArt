import { Component, OnInit, Input } from '@angular/core';
import { Draw } from '../_models/Draw.interface';

@Component({
  selector: 'app-draw-details',
  templateUrl: './draw-details.component.html',
  styleUrls: ['./draw-details.component.less']
})
export class DrawDetailsComponent implements OnInit {

  @Input() draw: Draw;

  
  constructor() { }

  ngOnInit() {
  }

}
