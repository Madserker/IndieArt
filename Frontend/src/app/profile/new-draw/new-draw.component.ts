import { Component, OnInit, Input } from '@angular/core';
import { ListsService } from '../../lists.service';
import { NgForm } from '@angular/forms';
import { User } from '../../_models/User.interface';
import { Author } from '../../_models/Author.interface';


@Component({
  selector: 'app-new-draw',
  templateUrl: './new-draw.component.html',
  styleUrls: ['./new-draw.component.less']
})
export class NewDrawComponent implements OnInit {

  file : File
  @Input() currentUser : User
  @Input() author: Author

  constructor(private lists : ListsService) { }

  ngOnInit() {




  }

openForm(){
    document.getElementById('myModal1').style.display = "block"
}
closeForm(){
  document.getElementById('myModal1').style.display = "none"
}


fileChange(event) {
  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {
      this.file = fileList[0];
  }
}

uploadDraw(form: NgForm){
  console.log(this.file)
  this.lists.uploadDraw(
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




