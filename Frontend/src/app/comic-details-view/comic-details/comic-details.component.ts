import { Component, OnInit, Input } from '@angular/core';
import { Comic } from '../../_models/Comic.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { User } from '../../_models/User.interface';
import { ListsService } from '../../lists.service';


@Component({
  selector: 'app-comic-details',
  templateUrl: './comic-details.component.html',
  styleUrls: ['./comic-details.component.less']
})
export class ComicDetailsComponent implements OnInit {

  @Input() comic : Comic
  currentUser : User;
  
  constructor(private lists : ListsService, private router:Router,private authService : AuthService) {
    this.getUser();
   }

  ngOnInit() {
  }

  goToChaptersList(){
    this.router.navigateByUrl("comic/"+this.comic.id+"/chapters");
  }

  deleteComic(){
    this.lists.deleteComic(this.comic.id).subscribe(
      () => {
        this.router.navigateByUrl("/");
      }
    );
  }

  getUser(){
    if(JSON.parse(this.authService.getUser())==null){}
    else{
      this.currentUser = JSON.parse(this.authService.getUser())[0];//cogemos el usuario del localStorage
    }
  }

}
