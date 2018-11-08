import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Draw } from '../../_models/Draw.interface';
import { ListsService } from '../../lists.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommentsService } from '../../comments.service';
import { DrawComment } from '../../_models/DrawComment.interface';

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


  constructor(private route: ActivatedRoute,private lists: ListsService,private commentsService : CommentsService) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        console.log(params.id) //params = draw.id
        this.id = params.id;
      }
    )
    //cogemos el dibujo con el id de la ruta
    this.lists.getDrawById(this.id)
    .subscribe(result => {
    this.draw = result as Draw
    })

    //cogemos la lista de comentarios del dibujo con el id de la ruta
    this.commentsService.getDrawComments(this.id)
    .subscribe(result => {
    this.comments = result as Comment[]
    console.log(this.comments);
    })
  }

}