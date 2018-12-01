import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User.interface';
import { Comic } from '../../_models/Comic.interface';
import { ListsService } from '../../lists.service';
import { Router } from '@angular/router';
import { Author } from '../../_models/Author.interface';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.less']
})
export class ComicListComponent implements OnInit {
  @Input() author:Author;
  @Input() currentUser:User;
  comics: Comic[] = [];
  isCurrentUser: boolean;
  
  constructor(private lists: ListsService,private router:Router) { }

  ngOnInit() {

  }

  ngOnChanges(){
    console.log("this.author.username")

    console.log(this.author.username)
    this.lists.getUserComics(this.author.username)
    .subscribe(result => {
      this.comics = result as Comic[]
      console.log(this.comics)
    })    
    if(this.author.username==this.currentUser.username){
      this.isCurrentUser=true
    }else{
      this.isCurrentUser=false
    }
  }

  goToComicDetails(id){
    this.router.navigateByUrl("comic/"+id);
  }


}
