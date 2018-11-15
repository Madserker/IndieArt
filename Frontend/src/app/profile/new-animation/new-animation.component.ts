import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListsService } from '../../lists.service';
import { User } from '../../_models/User.interface';

@Component({
  selector: 'app-new-animation',
  templateUrl: './new-animation.component.html',
  styleUrls: ['./new-animation.component.less']
})
export class NewAnimationComponent implements OnInit {
  file : File
  formData:FormData
  @Input() currentUser : User
  constructor(private lists : ListsService) { }

  ngOnInit() {




  }




  // Get the modal


// // Get the button that opens the modal
// btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
openForm(){
    document.getElementById('myModal3').style.display = "block"
}
closeForm(){
  document.getElementById('myModal3').style.display = "none"
}


// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }


fileChange(event) {
  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {
      this.file = fileList[0];
  }
}

uploadDraw(form: NgForm){
  this.lists.uploadDraw(
    form.value.name,
    form.value.desc,
    this.file,
    this.currentUser.username
    ).subscribe(
      response =>  window.location.reload(),//si ha ido bien el login
      error => console.log(error)//si no ha ido bien el login
    );
}

}
