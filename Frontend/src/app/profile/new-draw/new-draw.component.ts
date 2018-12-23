import { Component, OnInit, Input } from '@angular/core';
import { ListsService } from '../../lists.service';
import { NgForm } from '@angular/forms';
import { User } from '../../_models/User.interface';
import { Author } from '../../_models/Author.interface';
import { GetTagsService } from 'src/app/get-tags.service';
import { TagsService } from 'src/app/tags.service';


@Component({
  selector: 'app-new-draw',
  templateUrl: './new-draw.component.html',
  styleUrls: ['./new-draw.component.less']
})
export class NewDrawComponent implements OnInit {

  filters:string [] = [];
  selectedFilters:string[] = [];
  file : File
  @Input() currentUser : User
  @Input() author: Author

  constructor(private tagsService:TagsService, private lists : ListsService,private getTags:GetTagsService) { }

  ngOnInit() {

    this.getTags.getDrawFilters().subscribe(res=>{
      for(let tag of res){
        console.log(tag.text)
        this.filters.push(tag.text)
      }
    })


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

uploadDraw(form: NgForm){
  console.log(this.file)
  this.lists.uploadDraw(
    form.value.name,
    form.value.desc,
    this.file,
    this.author.username
    ).subscribe(
      response =>{
        for(let tag of this.selectedFilters){
          console.log(response.draw.id)
          this.tagsService.addTag(response.draw.id,tag).subscribe(res=>
            window.location.reload()
            )
        }
        
      },
      error => console.log(error)//si no ha ido bien el login
    );
}


}




