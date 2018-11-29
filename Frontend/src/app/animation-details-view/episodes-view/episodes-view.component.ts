import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../lists.service';
import { A_Animation } from '../../_models/A_Animation.interface';
import { Episode } from '../../_models/Episode.interface';
import { User } from '../../_models/User.interface';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-episodes-view',
  templateUrl: './episodes-view.component.html',
  styleUrls: ['./episodes-view.component.less'],
  providers: [ListsService]
})
export class EpisodesViewComponent implements OnInit {
  id:number
  episodes:Episode[]
  currentUser:User
  isCurrentUser:boolean
  username:string


  constructor(private route:ActivatedRoute,private lists:ListsService,private authService:AuthService) {
    this.getUser();
   }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        console.log(params.id) //params = animation.id
        this.id = params.id
      }
      )
      //cogemos la animacion con el id de la ruta
      this.lists.getEpisodes(this.id)
      .subscribe(result => {
      this.episodes = result as Episode[]
      console.log(this.episodes)
      })

      this.lists.getAnimationById(this.id).subscribe(result => {
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
