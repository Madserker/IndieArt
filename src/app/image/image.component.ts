import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.less']
})
export class ImageComponent implements OnInit {

  @Input() name: string;
  @Input() author: string;
  @Input() image: string;
  @Input() id: number;

  constructor() {

   }

  ngOnInit() {

  }

  showText(){
    document.getElementById("text"+this.id.toString()).style.visibility="visible";
    
  }
  hideText(){
    document.getElementById("text"+this.id.toString()).style.visibility="hidden";
  }
}
