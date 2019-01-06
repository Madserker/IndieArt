import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../_models/User.interface';
import { Comic } from '../../../_models/Comic.interface';
import { ListsService } from '../../../services/lists.service';
import { Router } from '@angular/router';
import { Author } from '../../../_models/Author.interface';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.less']
})
export class ComicListComponent implements OnInit {
  @Input() author:Author;
  @Input() currentUser:User;
  comics: Comic[] = [];
  isCurrentUser: boolean = false;
  
  constructor(private lists: ListsService,private router:Router) { }

  ngOnInit() {

  }

  ngOnChanges(){

    console.log(this.author.username)
    this.lists.getUserComics(this.author.username)
    .subscribe(result => {
      this.comics = result as Comic[]
      console.log(this.comics)
    })    
    if(this.author.username==this.currentUser.username){
      this.isCurrentUser=true
    }else{
      //si no somos el usuario, comprobamos que esto sea un equipo y que estamos dentro
      this.lists.getTeamUsers(this.author.username).subscribe(result=>{
        for(let user of result){
          if(user.user == this.currentUser.username){
            this.isCurrentUser=true
          }
        }
      })
    }
  }

  goToComicDetails(id){
    this.router.navigateByUrl("comic/"+id);
  }


}
