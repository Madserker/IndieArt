import { Component, OnInit, Input } from '@angular/core';
import { Draw } from '../../_models/Draw.interface';
import { ListsService } from '../../lists.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/User.interface';
import { Author } from '../../_models/Author.interface';

@Component({
  selector: 'app-draw-list',
  templateUrl: './draw-list.component.html',
  styleUrls: ['./draw-list.component.less']
})
export class DrawListComponent implements OnInit {
  @Input() author:Author;
  @Input() currentUser:User;

  isCurrentUser: boolean
  draws: Draw[] = [];

  constructor(private lists: ListsService,private router:Router) { }

  ngOnInit() {

  }
  ngOnChanges(){
//cuando detecta un cambio se ejecuta, en este caso cuando recibimos en input user
    this.lists.getUserDraws(this.author.username)
    .subscribe(result => {
      this.draws = result as Draw[]
      console.log(this.draws)
    })
    if(this.author.username==this.currentUser.username){
      this.isCurrentUser=true
    }else{
      this.isCurrentUser=false
    }
  }

  goToDrawDetails(id){
    this.router.navigateByUrl("draw/"+id);
  }


}
