import { Component, OnInit, Input } from '@angular/core';
import { Comic } from '../_models/Comic.interface';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.less']
})
export class ComicComponent implements OnInit {

 
  @Input() comic: Comic;


  constructor() {

   }

  ngOnInit() {
    console.log(this.comic.id);
  }


  showText(){
    document.getElementById("text"+this.comic.id.toString()).style.visibility="visible";
    
  }
  hideText(){
    document.getElementById("text"+this.comic.id.toString()).style.visibility="hidden";
  }

}
