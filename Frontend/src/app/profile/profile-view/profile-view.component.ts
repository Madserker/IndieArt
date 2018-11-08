import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User.interface';
import { ListsService } from '../../lists.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.less'],
  providers: [ListsService]
})
export class ProfileViewComponent implements OnInit {

  user : User;
  username : string;


  constructor(private route: ActivatedRoute,private lists: ListsService) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.username = params.username;
      }
    )
    //cogemos el username de la ruta y buscamos en la base de datos el usuario con ese username
    this.lists.getUserByUsername(this.username)
    .subscribe(result => {
    this.user = result[0] as User
    })

  }

}
