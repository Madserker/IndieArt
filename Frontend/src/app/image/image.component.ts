import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { Draw } from '../_models/Draw.interface';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.less']
})
export class ImageComponent implements OnInit {

  /*
  @Input() name: string;
  @Input() author: string;
  @Input() image: string;
  @Input() id: number;
*/

  @Input() draw: Draw;



  constructor() {

   }

  ngOnInit() {

  }


  showText(){
    document.getElementById("text"+this.draw.id.toString()).style.visibility="visible";
    
  }
  hideText(){
    document.getElementById("text"+this.draw.id.toString()).style.visibility="hidden";
  }
}
