import { Component, OnInit, Input } from '@angular/core';
import { Draw } from '../../_models/Draw.interface';
import { ListsService } from '../../lists.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { User } from '../../_models/User.interface';

@Component({
  selector: 'app-draw-details',
  templateUrl: './draw-details.component.html',
  styleUrls: ['./draw-details.component.less']
})
export class DrawDetailsComponent implements OnInit {

  @Input() draw: Draw;

  currentUser:User;

  
  constructor(private authService : AuthService, private lists : ListsService, private router : Router) { 
    this.getUser();
  }

  ngOnInit() {
  }
  
  deleteDraw(){
    this.lists.deleteDraw(this.draw.id).subscribe(
      () => {
        this.router.navigateByUrl("/");
      }
    );
  }





  getUser(){
    if(JSON.parse(this.authService.getUser())==null){}
    else{
      this.currentUser = JSON.parse(this.authService.getUser());//cogemos el usuario del localStorage
    }
  }

}
