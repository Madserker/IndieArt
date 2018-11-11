import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() commentDeleted = new EventEmitter<Comment>();
  @Input() currentUser : User;
  @Input() type : number;

  constructor(private commentsService:CommentsService) { }

  ngOnInit() {
  }

  deleteComment(){
    if(this.type==1){
    this.commentsService.deleteDrawComment(this.comment.id).subscribe(
      () => {
        this.commentDeleted.emit(this.comment);
      }
    );
    }
    else if(this.type==2){
      this.commentsService.deleteComicComment(this.comment.id).subscribe(
        () => {
          this.commentDeleted.emit(this.comment);
        }
      );
      }
      else if(this.type==3){
        this.commentsService.deleteAnimationComment(this.comment.id).subscribe(
          () => {
            this.commentDeleted.emit(this.comment);
          }
        );
        }
  }
}
