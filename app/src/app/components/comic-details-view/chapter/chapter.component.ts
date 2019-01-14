import { Component, OnInit, Input } from '@angular/core';
import { ListsService } from '../../../services/lists.service';
import { Page } from '../../../_models/Page.interface';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.less']
})
export class ChapterComponent implements OnInit {
  @Input() chapter : Chapter;
  @Input() isCurrentUser : boolean;

  pages : Page[];
  length;
  slideIndex = 1;


  constructor(private lists: ListsService) { }

  ngOnInit() {
    this.lists.getPages(this.chapter.id).subscribe(result => {
      this.pages = result as Page[],
      this.length = this.pages.length,
      console.log(this.pages)
    });

  }


  openModal() {//abrimos el visor
    document.getElementById('myModal'+this.chapter.id).style.display = "block";
  }
  
  closeModal() {//cerramos el visor
    document.getElementById('myModal'+this.chapter.id).style.display = "none";
  }
  


  deleteChapter(){
    if (confirm("Delete this chapter?")) {
    this.lists.deleteChapter(this.chapter.id).subscribe(
      () => {
        window.location.reload();
      }
    );
    }
  }
  
  

}
