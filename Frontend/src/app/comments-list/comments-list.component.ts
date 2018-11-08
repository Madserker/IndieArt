import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../_models/Comment.interface';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.less']
})
export class CommentsListComponent implements OnInit {

@Input() comments : Comment [];

constructor() { }

  ngOnInit() {
  }



}
