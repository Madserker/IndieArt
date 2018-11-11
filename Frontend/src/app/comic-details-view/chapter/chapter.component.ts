import { Component, OnInit, Input } from '@angular/core';
import { ListsService } from '../../lists.service';
import { Page } from '../../_models/Page.interface';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.less']
})
export class ChapterComponent implements OnInit {
  @Input() chapter : Chapter;

  pages : Page[];
  length;
  slideIndex = 1;
  constructor(private lists: ListsService) { }

  ngOnInit() {
    this.showSlides(this.slideIndex);
    this.lists.getPages(this.chapter.id).subscribe(result => {
      this.pages = result as Page[],
      this.length = this.pages.length,
      console.log(this.pages)
    });

  }


  openModal() {
    document.getElementById('myModal').style.display = "block";
  }
  
  closeModal() {
    document.getElementById('myModal').style.display = "none";
  }
  

  
  
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  
  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }
  
  showSlides(n) {
    // var i;
    // var slides = document.getElementsByClassName("mySlides");
    // var dots = document.getElementsByClassName("demo");
    // var captionText = document.getElementById("caption");
    // if (n > slides.length) {this.slideIndex = 1}
    // if (n < 1) {this.slideIndex = slides.length}
    // for (i = 0; i < slides.length; i++) {
    //     slides[i].style.display = "none";
    // }
    // for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    // }
    // slides[this.slideIndex-1].style.display = "block";
    // dots[this.slideIndex-1].className += " active";
    // captionText.innerHTML = dots[this.slideIndex-1].alt;
  }

}
