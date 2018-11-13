import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User.interface';
import { ListsService } from '../../lists.service';
import { Router } from '@angular/router';
import { A_Animation } from '../../_models/A_Animation.interface';

@Component({
  selector: 'app-animation-list',
  templateUrl: './animation-list.component.html',
  styleUrls: ['./animation-list.component.less']
})
export class AnimationListComponent implements OnInit {

  @Input() user : User;
  @Input() currentUser:User;
  animations : A_Animation[];

  isCurrentUser : boolean;
  
  constructor(private lists: ListsService,private router:Router) { }

  ngOnInit() {
 
  }

  ngOnChanges(){
    this.lists.getUserAnimations(this.user.username)
    .subscribe(result => {
      this.animations = result as A_Animation[]
    })  
    if(this.user.username==this.currentUser.username){
      this.isCurrentUser=true
    }else{
      this.isCurrentUser=false
    }
  }

  goToAnimationDetails(id){
    this.router.navigateByUrl("animation/"+id);
  }


}
