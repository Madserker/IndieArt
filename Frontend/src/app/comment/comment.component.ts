import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../_models/Comment.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less']
})
export class CommentComponent implements OnInit {

  @Input() comment : Comment;

  constructor() { }

  ngOnInit() {
  }

}
