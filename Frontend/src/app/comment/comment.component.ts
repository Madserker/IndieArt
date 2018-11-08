import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../_models/Comment.interface';
import { User } from '../_models/User.interface';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less']
})
export class CommentComponent implements OnInit {

  @Input() comment : Comment;
  @Input() currentUser : User;

  constructor(private commentsService:CommentsService) { }

  ngOnInit() {
  }

  deleteComment(){
    this.commentsService.deleteDrawComment(this.comment.id).subscribe(
      () => {
        window.location.reload()
      }
    );
  }
}
