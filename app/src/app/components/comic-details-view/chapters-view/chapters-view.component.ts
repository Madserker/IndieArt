import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../../services/lists.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../_models/User.interface';

@Component({
  selector: 'app-chapters-view',
  templateUrl: './chapters-view.component.html',
  styleUrls: ['./chapters-view.component.less'],
  providers: [ListsService]
})
export class ChaptersViewComponent implements OnInit {
id:number
chapters:Chapter[]
currentUser:User
isCurrentUser:boolean
username:string

constructor(private route:ActivatedRoute,private lists:ListsService,private authService:AuthService) {
  this.getUser();
 }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        console.log(params.id) //params = comic.id
        this.id = params.id
      }
      )
      //cogemos el comic con el id de la ruta
      this.lists.getChapters(this.id)
      .subscribe(result => {
      this.chapters = result as Chapter[]
      console.log(this.chapters)
      })


      this.lists.getComicById(this.id).subscribe(result => {
        this.username = result.author
        //comprobamos si somos nosotros el currentUser
        //no podemos usar ngOnChanges porque recibimos los paramtreos por la ruta y no por input
        //si se hiciera con input, no podriamos acceder al id de la animacion en caso de entrar directamente en la ruta
          if(this.username==this.currentUser.username){
            this.isCurrentUser=true
          }else{
            this.isCurrentUser=false
          }
        })
  }

  getUser(){
    if(JSON.parse(this.authService.getUser())==null){}
    else{
      this.currentUser = JSON.parse(this.authService.getUser());//cogemos el usuario del localStorage
    }
  }
}
