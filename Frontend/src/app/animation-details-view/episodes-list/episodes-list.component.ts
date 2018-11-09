import { Component, OnInit, Input } from '@angular/core';
import { Episode } from '../../_models/Episode.interface';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.less']
})
export class EpisodesListComponent implements OnInit {
  @Input() episodes : Episode[]
  constructor() { }

  ngOnInit() {
  }

}
