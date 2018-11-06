import { Component, OnInit } from '@angular/core';
import { Draw } from '../../_models/Draw.interface';
import { ListsService } from '../../lists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-draw-list',
  templateUrl: './draw-list.component.html',
  styleUrls: ['./draw-list.component.less']
})
export class DrawListComponent implements OnInit {

  draws: Draw[] = [];

  constructor(private lists: ListsService,private router:Router) { }

  ngOnInit() {
    this.lists.getDraws()
    .subscribe(result => {
      this.draws = result as Draw[]
    })    
  }

  goToDrawDetails(id){
    this.router.navigateByUrl("draw/"+id);
  }

}
