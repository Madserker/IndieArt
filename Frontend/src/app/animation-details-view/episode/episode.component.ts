import { Component, OnInit, Input } from '@angular/core';
import { Episode } from '../../_models/Episode.interface';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.less']
})
export class EpisodeComponent implements OnInit {
@Input() episode : Episode;
  constructor() { }

  ngOnInit() {
  }

}
