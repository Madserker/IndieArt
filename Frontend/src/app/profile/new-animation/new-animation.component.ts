import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListsService } from '../../lists.service';
import { User } from '../../_models/User.interface';
import { Author } from '../../_models/Author.interface';

@Component({
  selector: 'app-new-animation',
  templateUrl: './new-animation.component.html',
  styleUrls: ['./new-animation.component.less']
})
export class NewAnimationComponent implements OnInit {
  file : File
  formData:FormData
  @Input() currentUser : User
  @Input() author : Author
  constructor(private lists : ListsService) { }

  ngOnInit() {

  }

openForm(){
    document.getElementById('myModal3').style.display = "block"
}
closeForm(){
    document.getElementById('myModal3').style.display = "none"
}


fileChange(event) {
  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {
      this.file = fileList[0];
  }
}

uploadAnimation(form: NgForm){
  this.lists.uploadAnimation(
    form.value.name,
    form.value.desc,
    this.file,
    this.author.username
    ).subscribe(
      response =>  window.location.reload(),//si ha ido bien el login
      error => console.log(error)//si no ha ido bien el login
    );
}

}
