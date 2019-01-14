import { Component, OnInit, Input } from '@angular/core';
import { A_Animation } from '../../../_models/A_Animation.interface';
import { Router } from '@angular/router';
import { ListsService } from '../../../services/lists.service';
import { User } from '../../../_models/User.interface';
import { UsersService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-animation-details',
  templateUrl: './animation-details.component.html',
  styleUrls: ['./animation-details.component.less']
})
export class AnimationDetailsComponent implements OnInit {

  @Input() animation : A_Animation;

  @Input() score : number;
  @Input() visits : number;

  @Input() currentUser:User;
  @Input() userScore:number;

  @Input() isCurrentUser : boolean;

  constructor(private usersService : UsersService,private authService : AuthService, private lists : ListsService, private router : Router) { }

  ngOnInit() {
  }

  onChange(newValue) {
    this.usersService.vote(this.animation.id,this.currentUser.username,newValue).subscribe(
      result=>{
        this.usersService.getScore(this.animation.id)    
        .subscribe(result => {
          this.score = result as number
        })
      }
    );
}

  goToEpisodesList(){
    this.router.navigateByUrl("animation/"+this.animation.id+"/episodes");
  }

  deleteAnimation(){
    if (confirm("Delete this animation?")) {
    this.lists.deleteAnimation(this.animation.id).subscribe(
      () => {
        this.router.navigateByUrl("/");
      }
    );
    }
  }
}
