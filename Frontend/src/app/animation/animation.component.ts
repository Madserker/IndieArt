import { Component, OnInit, Input } from '@angular/core';
import { A_Animation } from '../_models/A_Animation.interface';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.less']
})
export class AnimationComponent implements OnInit {

 
  @Input() animation: A_Animation;


  constructor() {

   }

  ngOnInit() {

  }


  showText(){
    document.getElementById("animation"+this.animation.id.toString()).style.visibility="visible";
  }
  hideText(){
    document.getElementById("animation"+this.animation.id.toString()).style.visibility="hidden";
  }


}
