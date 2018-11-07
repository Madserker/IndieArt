import { Component, OnInit, Input } from '@angular/core';
import { Draw } from '../../_models/Draw.interface';
import { ListsService } from '../../lists.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/User.interface';

@Component({
  selector: 'app-draw-list',
  templateUrl: './draw-list.component.html',
  styleUrls: ['./draw-list.component.less']
})
export class DrawListComponent implements OnInit {
@Input() user:User;
  draws: Draw[] = [];

  constructor(private lists: ListsService,private router:Router) { }

  ngOnInit() {
    this.lists.getUserDraws(this.user.username)
    .subscribe(result => {
      this.draws = result as Draw[]
      console.log(this.draws)

    })    

  }

  goToDrawDetails(id){
    this.router.navigateByUrl("draw/"+id);
  }

}
