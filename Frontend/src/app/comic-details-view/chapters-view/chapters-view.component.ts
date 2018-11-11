import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../lists.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chapters-view',
  templateUrl: './chapters-view.component.html',
  styleUrls: ['./chapters-view.component.less'],
  providers: [ListsService]
})
export class ChaptersViewComponent implements OnInit {
id:number
chapters:Chapter[]

  constructor(private route:ActivatedRoute,private lists:ListsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        console.log(params.id) //params = animation.id
        this.id = params.id
      }
      )
      //cogemos la animacion con el id de la ruta
      this.lists.getChapters(this.id)
      .subscribe(result => {
      this.chapters = result as Chapter[]
      console.log(this.chapters)
      })
  }

}
