import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.less']
})
export class ChaptersListComponent implements OnInit {
  @Input() chapters : Chapter[]
  constructor() { }

  ngOnInit() {
  }

}
