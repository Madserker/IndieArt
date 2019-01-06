import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../_models/Comment.interface';
import { User } from '../../_models/User.interface';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less']
})
export class CommentComponent implements OnInit {

  @Input() comment : Comment;
  @Output() commentDeleted = new EventEmitter<Comment>();
  @Input() currentUser : User;

  constructor(private commentsService:CommentsService) { }

  ngOnInit() {
  }

  deleteComment(){
    this.commentsService.deleteComment(this.comment.id).subscribe(
      () => {
        this.commentDeleted.emit(this.comment);//notifica al padre y actualiza la lista de comentarios
      }
    );
    
  }
}
