import { Component, OnInit, Input } from '@angular/core';
import { Comic } from '../../_models/Comic.interface';

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

  }


  showText(){
    document.getElementById("comic"+this.comic.id.toString()).style.visibility="visible";
    
  }
  hideText(){
    document.getElementById("comic"+this.comic.id.toString()).style.visibility="hidden";
  }

}
