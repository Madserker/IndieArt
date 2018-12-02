import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User.interface';
import { ListsService } from '../../lists.service';
import { Router } from '@angular/router';
import { A_Animation } from '../../_models/A_Animation.interface';
import { Author } from '../../_models/Author.interface';

@Component({
  selector: 'app-animation-list',
  templateUrl: './animation-list.component.html',
  styleUrls: ['./animation-list.component.less']
})
export class AnimationListComponent implements OnInit {

  @Input() author : Author;
  @Input() currentUser:User;
  animations : A_Animation[];

  isCurrentUser : boolean=false;
  
  constructor(private lists: ListsService,private router:Router) { }

  ngOnInit() {
 
  }

  ngOnChanges(){
    this.lists.getUserAnimations(this.author.username)
    .subscribe(result => {
      this.animations = result as A_Animation[]
    })  
    if(this.author.username==this.currentUser.username){
      this.isCurrentUser=true
    }else{
      //si no somos el usuario, comprobamos que esto sea un equipo y que estamos dentro
      this.lists.getTeamUsers(this.author.username).subscribe(result=>{
        for(let user of result){
          if(user.user == this.currentUser.username){
            this.isCurrentUser=true
          }
        }
      })
    }
  }

  goToAnimationDetails(id){
    this.router.navigateByUrl("animation/"+id);
  }


}
