import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Draw } from '../../../_models/Draw.interface';
import { ListsService } from '../../../services/lists.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommentsService } from '../../../services/comments.service';
import { DrawComment } from '../../../_models/DrawComment.interface';
import { Comment } from '../../../_models/Comment.interface';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../_models/User.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-draw-view',
  templateUrl: './draw-view.component.html',
  styleUrls: ['./draw-view.component.less'],
  providers: [ListsService,CommentsService]
})
export class DrawViewComponent implements OnInit {

draw : Draw;
comments : Comment [];
id:number;

visits:number;
score:number;

userScore:number;

currentUser : User;


  constructor(private authService: AuthService, private usersService: UsersService, private route: ActivatedRoute,private lists: ListsService,private commentsService : CommentsService) {
    
  }

  ngOnChange(){
    
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        console.log(params.id) //params = draw.id
        this.id = params.id;

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
    //cogemos el dibujo con el id de la ruta
    this.lists.getDrawById(this.id)
    .subscribe(result => {
    this.draw = result as Draw
    })

    //cogemos la lista de comentarios del dibujo con el id de la ruta
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