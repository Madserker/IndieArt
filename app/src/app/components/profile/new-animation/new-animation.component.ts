import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListsService } from '../../../services/lists.service';
import { User } from '../../../_models/User.interface';
import { Author } from '../../../_models/Author.interface';
import { TagsService } from 'src/app/services/tags.service';
import { GetTagsService } from 'src/app/services/get-tags.service';

@Component({
  selector: 'app-new-animation',
  templateUrl: './new-animation.component.html',
  styleUrls: ['./new-animation.component.less']
})
export class NewAnimationComponent implements OnInit {

  filters:string [] = [];
  selectedFilters:string[] = [];
  file : File
  formData:FormData
  @Input() currentUser : User
  @Input() author : Author
  constructor(private tagsService:TagsService, private lists : ListsService,private getTags:GetTagsService) { }

  ngOnInit() {
    this.getTags.getAnimationFilters().subscribe(res=>{
      for(let tag of res){
        this.filters.push(tag.text)
      }
    })
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
uploadAnimation(form: NgForm){
  this.lists.uploadAnimation(
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
