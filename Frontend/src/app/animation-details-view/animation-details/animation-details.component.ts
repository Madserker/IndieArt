import { Component, OnInit, Input } from '@angular/core';
import { A_Animation } from '../../_models/A_Animation.interface';
import { Router } from '@angular/router';
import { ListsService } from '../../lists.service';
import { User } from '../../_models/User.interface';

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

  constructor(private lists : ListsService, private router:Router) { }

  ngOnInit() {
  }

  goToEpisodesList(){
    this.router.navigateByUrl("animation/"+this.animation.id+"/episodes");
  }

  deleteAnimation(){
    this.lists.deleteAnimation(this.animation.id).subscribe(
      () => {
        this.router.navigateByUrl("/");
      }
    );
  }
}
