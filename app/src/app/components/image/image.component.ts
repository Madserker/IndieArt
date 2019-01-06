import { Component, OnInit, Input } from '@angular/core';
import { debuglog } from 'util';
import { Draw } from '../../_models/Draw.interface';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.less']
})
export class ImageComponent implements OnInit {

  @Input() draw: Draw;
  


  constructor() {

   }

  ngOnInit() {
    console.log(this.draw.id);
  }


  showText(){
    document.getElementById("draw"+this.draw.id.toString()).style.visibility="visible";
    
  }
  hideText(){
    document.getElementById("draw"+this.draw.id.toString()).style.visibility="hidden";
  }
}
