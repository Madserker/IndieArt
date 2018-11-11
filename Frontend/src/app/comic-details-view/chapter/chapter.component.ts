import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.less']
})
export class ChapterComponent implements OnInit {
  @Input() chapter : Chapter;
  constructor() { }

  ngOnInit() {
  }

}
