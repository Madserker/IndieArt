import { Component, OnInit, Input } from '@angular/core';
import { Episode } from '../../../_models/Episode.interface';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.less']
})
export class EpisodeComponent implements OnInit {
@Input() episode : Episode;
@Input() isCurrentUser : boolean;
opened :boolean = false;
  constructor(private listsService : ListsService) { }

  ngOnInit() {
  }

  openVideo() {
    if(!this.opened){
    document.getElementById("video"+this.episode.id).style.width = "100%";
    document.getElementById("video"+this.episode.id).style.height = "100%";
    document.getElementById("button"+this.episode.id).innerText = "Close";
    this.opened=true;
  }else{
    document.getElementById("video"+this.episode.id).style.width = "0px";
    document.getElementById("video"+this.episode.id).style.height = "0px";
    document.getElementById("button"+this.episode.id).innerText = "Watch";
    this.opened=false;
  } 
}


deleteEpisode(){
  if (confirm("Delete this episode?")) {
  this.listsService.deleteEpisode(this.episode.id).subscribe(
    () => {
      window.location.reload();
    }
  );
  }
}

}
