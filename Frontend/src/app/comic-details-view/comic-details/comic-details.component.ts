import { Component, OnInit, Input } from '@angular/core';
import { Comic } from '../../_models/Comic.interface';


@Component({
  selector: 'app-comic-details',
  templateUrl: './comic-details.component.html',
  styleUrls: ['./comic-details.component.less']
})
export class ComicDetailsComponent implements OnInit {

  @Input() comic : Comic
  
  constructor() { }

  ngOnInit() {
  }

}
