import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListsService } from '../../lists.service';
import { User } from '../../_models/User.interface';
import { Author } from '../../_models/Author.interface';
import { TagsService } from 'src/app/tags.service';
import { GetTagsService } from 'src/app/get-tags.service';

@Component({
  selector: 'app-new-comic',
  templateUrl: './new-comic.component.html',
  styleUrls: ['./new-comic.component.less']
})
export class NewComicComponent implements OnInit {
  
  filters:string [] = [];
  selectedFilters:string[] = [];
  file : File
  @Input() currentUser : User
  @Input() author : Author

  constructor(private tagsService:TagsService, private lists : ListsService,private getTags:GetTagsService) { }

  ngOnInit() {




  }




  // Get the modal


// // Get the button that opens the modal
// btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
openForm(){
    document.getElementById('myModal2').style.display = "block"
}
closeForm(){
  document.getElementById('myModal2').style.display = "none"
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
toggleSelection(filter,event){//ADD OR REMOVE FILTERS ON SELECTED FILTERS LIST
  console.log(filter)
  if(this.selectedFilters.indexOf(filter) > -1){
    var index = this.selectedFilters.indexOf(filter);
    this.selectedFilters.splice(index,1);
    console.log(this.selectedFilters);
  }else{
    this.selectedFilters.push(filter);
    console.log(this.selectedFilters);
  }
}
uploadComic(form: NgForm){
  this.lists.uploadComic(
    form.value.name,
    form.value.desc,
    this.file,
    this.author.username
    ).subscribe(
      response =>{
        for(let tag of this.selectedFilters){
          console.log(response)
          this.tagsService.addTag(response,tag).subscribe(res=>
            window.location.reload()
            )
        }
        
      },
      error => console.log(error)//si no ha ido bien el login
    );
}

}
