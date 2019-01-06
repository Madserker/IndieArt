import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/User.interface';
import { Author } from '../../../_models/Author.interface';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit {
@Input() author:Author;
@Input() currentUser:User;
  constructor() { }

  ngOnInit() {
  }

}
