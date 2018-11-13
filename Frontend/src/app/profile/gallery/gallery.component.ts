import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/User.interface';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit {
@Input() user:User;
@Input() currentUser:User;
  constructor() { }

  ngOnInit() {
  }

}
