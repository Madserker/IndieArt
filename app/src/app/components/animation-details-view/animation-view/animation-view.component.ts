import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../../services/lists.service';
import { CommentsService } from '../../../services/comments.service';
import { A_Animation } from '../../../_models/A_Animation.interface';
import { Comment } from '../../../_models/Comment.interface';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../_models/User.interface';
import { UsersService } from '../../../services/users.service';

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

  userScore:number;
  currentUser : User;

  isCurrentUser : boolean = false;
  
  
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
            //check is is the current user
            if(this.animation.author==this.currentUser.username){
              this.isCurrentUser=true
            }else{
              console.log("ress")
              //si no somos el usuario, comprobamos que esto sea un equipo y que estamos dentro
              this.lists.getTeamUsers(this.animation.author).subscribe(result=>{
                console.log(result)
                for(let user of result){
                  if(user.user == this.currentUser.username){
                    this.isCurrentUser=true
                  }
                }
              })
            }
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
              //cogemos la nota del usuario
      this.usersService.getUserScore(this.id,this.currentUser.username).subscribe(result=>{
        this.userScore = result
        console.log(result)
      });
      }
    }
  
}
