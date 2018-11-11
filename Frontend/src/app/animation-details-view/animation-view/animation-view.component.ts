import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../lists.service';
import { CommentsService } from '../../comments.service';
import { A_Animation } from '../../_models/A_Animation.interface';
import { AnimationComment } from '../../_models/AnimationComment.interface';

@Component({
  selector: 'app-animation-view',
  templateUrl: './animation-view.component.html',
  styleUrls: ['./animation-view.component.less'],
  providers: [ListsService,CommentsService]
})
export class AnimationViewComponent implements OnInit {

  animation : A_Animation;
  comments : AnimationComment [];
  id : number;
  
  
    constructor(private route: ActivatedRoute,private lists: ListsService,private commentsService : CommentsService) {}
  
    ngOnInit() {
      this.route.params.subscribe(
        params => {
          console.log(params.id) //params = animation.id
          this.id = params.id;
        }
      )
      //cogemos la animacion con el id de la ruta
      this.lists.getAnimationById(this.id)
      .subscribe(result => {
      this.animation = result as A_Animation
      })
  
      // //cogemos la lista de comentarios del dibujo con el id de la ruta
      this.commentsService.getAnimationComments(this.id)
      .subscribe(result => {
      this.comments = result as AnimationComment[]
      console.log(this.comments);
      })
    }
  
}
