import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../lists.service';
import { A_Animation } from '../../_models/A_Animation.interface';
import { Episode } from '../../_models/Episode.interface';

@Component({
  selector: 'app-episodes-view',
  templateUrl: './episodes-view.component.html',
  styleUrls: ['./episodes-view.component.less'],
  providers: [ListsService]
})
export class EpisodesViewComponent implements OnInit {
id:number
episodes:Episode[]
  constructor(private route:ActivatedRoute,private lists:ListsService) { }

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
  
  }

}
