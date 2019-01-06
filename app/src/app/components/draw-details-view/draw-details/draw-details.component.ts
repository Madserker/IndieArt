import { Component, OnInit, Input } from '@angular/core';
import { Draw } from '../../../_models/Draw.interface';
import { ListsService } from '../../../services/lists.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../_models/User.interface';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-draw-details',
  templateUrl: './draw-details.component.html',
  styleUrls: ['./draw-details.component.less']
})
export class DrawDetailsComponent implements OnInit {

  @Input() draw: Draw;

  @Input() score : number;
  @Input() visits : number;

  @Input() currentUser:User;
  @Input() userScore:number;

  
  constructor(private usersService : UsersService,private authService : AuthService, private lists : ListsService, private router : Router) { 
  }

  ngOnInit() {

  }
  ngOnChange(){

  }

  onChange(newValue) {
    console.log(newValue)
    if(newValue!=null){
    this.usersService.vote(this.draw.id,this.currentUser.username,newValue).subscribe(
      result=>{
        this.usersService.getScore(this.draw.id)    
        .subscribe(result => {
          this.score = result as number
        })
      }
    );
    }
}
  
  deleteDraw(){
    this.lists.deleteDraw(this.draw.id).subscribe(
      () => {
        this.router.navigateByUrl("/");
      }
    );
  }







}
