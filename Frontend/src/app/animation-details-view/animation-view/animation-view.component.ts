import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../lists.service';
import { CommentsService } from '../../comments.service';
import { A_Animation } from '../../_models/A_Animation.interface';
import { Comment } from '../../_models/Comment.interface';
import { AuthService } from '../../auth.service';
import { User } from '../../_models/User.interface';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-animation-view',
  templateUrl: './animation-view.component.html',
  styleUrls: ['./animation-view.component.less'],
  providers: [ListsService,CommentsService]
})
export class AnimationViewComponent implements OnInit {

  animation : A_Animation;
  comments : Comment [];
  id : number;

  visits:number;
  score:number;

  currentUser : User;
  
  
    constructor(private authService : AuthService, private usersService : UsersService, private route: ActivatedRoute,private lists: ListsService,private commentsService : CommentsService) {}
  
    ngOnInit() {
      this.route.params.subscribe(
        params => {
          console.log(params.id) //params = draw.id
          this.id = params.id;
  
          //llamamos get user cuando tenemos el id del art
          this.getUser();
          
          this.usersService.getScore(this.id)    
          .subscribe(result => {
            this.score = result as number
          })
  
  
  
          this.usersService.getVisits(this.id)    
          .subscribe(result => {
            this.visits = result as number
          })
  
  
        }
      )
      //cogemos la animacion con el id de la ruta
      this.lists.getAnimationById(this.id)
      .subscribe(result => {
      this.animation = result as A_Animation
      console.log(this.animation)
      })
  
      // //cogemos la lista de comentarios del dibujo con el id de la ruta
      this.commentsService.getComments(this.id)
      .subscribe(result => {
      this.comments = result as Comment[]
      console.log(this.comments);
      })
    }

    getUser(){
      if(JSON.parse(this.authService.getUser())==null){}
      else{
        this.currentUser = JSON.parse(this.authService.getUser());//cogemos el usuario del localStorage
        //añadimos visita
        this.usersService.visit(this.id,this.currentUser.username).subscribe(result=>{
        });
      }
    }
  
}
