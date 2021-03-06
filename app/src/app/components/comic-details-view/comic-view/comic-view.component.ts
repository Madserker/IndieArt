import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../../services/lists.service';
import { CommentsService } from '../../../services/comments.service';
import { Comic } from '../../../_models/Comic.interface';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../../_models/Comment.interface';
import { User } from '../../../_models/User.interface';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-comic-view',
  templateUrl: './comic-view.component.html',
  styleUrls: ['./comic-view.component.less'],
  providers: [ListsService,CommentsService]
})
export class ComicViewComponent implements OnInit {


  comic : Comic;
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
      //cogemos el dibujo con el id de la ruta
      this.lists.getComicById(this.id)
      .subscribe(result => {
      this.comic = result as Comic

      //check is is the current user
      if(this.comic.author==this.currentUser.username){
        this.isCurrentUser=true
      }else{
        console.log("ress")
        //si no somos el usuario, comprobamos que esto sea un equipo y que estamos dentro
        this.lists.getTeamUsers(this.comic.author).subscribe(result=>{
          console.log(result)
          for(let user of result){
            if(user.user == this.currentUser.username){
              this.isCurrentUser=true
            }
          }
        })
      }
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
