import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User.interface';
import { Comic } from '../../_models/Comic.interface';
import { ListsService } from '../../lists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.less']
})
export class ComicListComponent implements OnInit {
  @Input() user:User;
  comics: Comic[] = [];
  
  constructor(private lists: ListsService,private router:Router) { }

  ngOnInit() {
    this.lists.getUserComics(this.user.username)
    .subscribe(result => {
      this.comics = result as Comic[]
      console.log(this.comics)
    })    

  }

}
