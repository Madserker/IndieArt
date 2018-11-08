import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.less']
})
export class CommentsListComponent implements OnInit {

  comments : Comment[];
  constructor() { }

  ngOnInit() {
  }

}
