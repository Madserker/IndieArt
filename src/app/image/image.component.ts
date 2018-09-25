import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.less']
})
export class ImageComponent implements OnInit {

  @Input() name: string;
  @Input() author: string;
  @Input() image: string;

  constructor() {

   }

  ngOnInit() {

  }

}
