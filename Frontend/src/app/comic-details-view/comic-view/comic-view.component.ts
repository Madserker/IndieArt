import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../lists.service';
import { CommentsService } from '../../comments.service';
import { Comic } from '../../_models/Comic.interface';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../_models/Comment.interface';

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
  
  
    constructor(private route: ActivatedRoute,private lists: ListsService,private commentsService : CommentsService) {}
  
    ngOnInit() {
      this.route.params.subscribe(
        params => {
          console.log(params.id) //params = draw.id
          this.id = params.id;
        }
      )
      //cogemos el dibujo con el id de la ruta
      this.lists.getComicById(this.id)
      .subscribe(result => {
      this.comic = result as Comic
      })
  
      //cogemos la lista de comentarios del dibujo con el id de la ruta
      this.commentsService.getComments(this.id)
      .subscribe(result => {
      this.comments = result as Comment[]
      console.log(this.comments);
      })
    }

}
