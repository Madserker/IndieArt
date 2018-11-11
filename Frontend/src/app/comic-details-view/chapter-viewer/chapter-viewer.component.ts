import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../../_models/Page.interface';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-chapter-viewer',
  templateUrl: './chapter-viewer.component.html',
  styleUrls: ['./chapter-viewer.component.less']
})
export class ChapterViewerComponent implements OnInit {

  @Input() pages : Page[]

  currentIndex : number = 1;
  
  constructor() { }

  ngOnInit() {

  }


  openModal() {
    document.getElementById('myModal').style.display = "block";
  }
  
  closeModal() {
    document.getElementById('myModal').style.display = "none";
  }

  nextPage(){
    if(this.currentIndex < this.pages.length){
      this.currentIndex++;
    }
  }

  previousPage(){
    if(this.currentIndex > 1){
      this.currentIndex--;
    }
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {//listener de keyPressed en toda la pagina
    console.log(event.keyCode)
    if(event.keyCode == 27){//Escape key
      this.closeModal()
    }
    if(event.keyCode == 39){//right arrow key
      this.nextPage()
    }
    if(event.keyCode == 37){//left arrow key
      this.previousPage()
    }
  }


}
