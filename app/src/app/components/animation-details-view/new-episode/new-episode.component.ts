import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../_models/User.interface';
import { NgForm } from '@angular/forms';
import { ListsService } from '../../../services/lists.service';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-episode',
  templateUrl: './new-episode.component.html',
  styleUrls: ['./new-episode.component.less']
})
export class NewEpisodeComponent implements OnInit {

  @Input() currentUser:User
  id
  file:File
  
  constructor(private lists : ListsService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params.id
      }
      )
  }

  openForm(){
    document.getElementById('myModal4').style.display = "block"
  }
  closeForm(){
    document.getElementById('myModal4').style.display = "none"
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        this.file = fileList[0];
    }
  }
  
  uploadEpisode(form: NgForm){
    console.log(this.file)
    this.lists.uploadEpisode(
      form.value.name,
      form.value.number,
      this.file,
      this.currentUser.username,
      this.id
      ).subscribe(
        response =>  window.location.reload(),//si ha ido bien el login
        error => console.log(error)//si no ha ido bien el login
      );
  }

}
