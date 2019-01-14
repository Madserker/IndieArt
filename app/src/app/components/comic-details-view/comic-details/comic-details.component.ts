import { Component, OnInit, Input } from '@angular/core';
import { Comic } from '../../../_models/Comic.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../_models/User.interface';
import { ListsService } from '../../../services/lists.service';
import { UsersService } from '../../../services/users.service';


@Component({
  selector: 'app-comic-details',
  templateUrl: './comic-details.component.html',
  styleUrls: ['./comic-details.component.less']
})
export class ComicDetailsComponent implements OnInit {

  @Input() comic : Comic

  @Input() score : number;
  @Input() visits : number;

  @Input() currentUser:User;
  @Input() userScore:number;

  @Input() isCurrentUser : boolean;
  
  constructor(private usersService : UsersService,private authService : AuthService, private lists : ListsService, private router : Router) { 

   }

  ngOnInit() {

  }

  ngOnChange(){
  }

  onChange(newValue) {
    this.usersService.vote(this.comic.id,this.currentUser.username,newValue).subscribe(
      result=>{
        this.usersService.getScore(this.comic.id)    
        .subscribe(result => {
          this.score = result as number
        })
      }
    );
}
  goToChaptersList(){
    this.router.navigateByUrl("comic/"+this.comic.id+"/chapters");
  }

  deleteComic(){
    if (confirm("Delete this comic?")) {
    this.lists.deleteComic(this.comic.id).subscribe(
      () => {
        this.router.navigateByUrl("/");
      }
    );
    }
  }


}
