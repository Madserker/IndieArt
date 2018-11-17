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
  @Input() chapterId : number

  currentIndex : number = 1;
  
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(){
    console.log(this.pages)
  }


  openModal() {
    document.getElementById('myModal'+this.chapterId).style.display = "block";
  }
  
  closeModal() {
    document.getElementById('myModal'+this.chapterId).style.display = "none";
  }

  nextPage(){
    if(this.currentIndex < this.pages.length){
      this.currentIndex++;
    }
    document.getElementById('myModal').scrollTop = 0;

  }

  previousPage(){
    if(this.currentIndex > 1){
      this.currentIndex--;
    }
    document.getElementById('myModal').scrollTop = 0;
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
