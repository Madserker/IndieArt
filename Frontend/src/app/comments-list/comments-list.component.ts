import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../_models/Comment.interface';
import { NgForm } from '@angular/forms';
import { CommentsService } from '../comments.service';
import { AuthService } from '../auth.service';
import { User } from '../_models/User.interface';
import { DrawComment } from '../_models/DrawComment.interface';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.less'],
  providers: [CommentsService,AuthService]
})
export class CommentsListComponent implements OnInit {

currentUser : User;
  
@Input() comments : Comment [];
@Input() type : number;

@Input() draw_id : number;
@Input() animation_id : number;
@Input() comic_id : number;

constructor(private commentsService:CommentsService,private authService : AuthService) {
  this.getUser();//al iniciar o actualizar la pagina cogemos el usuario del local storage
 }

  ngOnInit() {
    
  }


  postComment(form: NgForm){
    if(this.type==1){
      this.commentsService.postDrawComment(this.draw_id,this.currentUser.username,form.value.text)
      .subscribe(
        () => 
          this.commentsService.getDrawComments(this.draw_id)
          .subscribe(result => {
          this.comments = result as Comment[]
        })
      );
    }else if(this.type==2){
      this.commentsService.postComicComment(this.comic_id,this.currentUser.username,form.value.text)
      .subscribe(
        () =>
        this.commentsService.getComicComments(this.comic_id)
        .subscribe(result => {
        this.comments = result as Comment[]
        })
      );
    }else if(this.type==3){
      this.commentsService.postAnimationComment(this.animation_id,this.currentUser.username,form.value.text)
      .subscribe(
        () =>
        this.commentsService.getAnimationComments(this.animation_id)
        .subscribe(result => {
        this.comments = result as Comment[]
        })
      );
    }
    form.reset();
    
  }

  getUser(){
    if(JSON.parse(this.authService.getUser())==null){
    }
    else{
      this.currentUser = JSON.parse(this.authService.getUser());//cogemos el usuario del localStorage
    }
  }

  //actualiza la lista de comentarios al eliminar un comentario
  onDeleted(comment: Comment) {
    const position = this.comments.findIndex(
      (commentEl: Comment) => {
        return commentEl.id == comment.id;
      }
    );
    this.comments.splice(position, 1);
  }

}
