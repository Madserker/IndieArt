import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListsService } from '../../lists.service';
import { User } from '../../_models/User.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-chapter',
  templateUrl: './new-chapter.component.html',
  styleUrls: ['./new-chapter.component.less']
})

export class NewChapterComponent implements OnInit {


  @Input() currentUser:User
  id
  file:File
  fileList:File [] = []
  pageCount:number=0
  countSubs;
  
  constructor(private lists : ListsService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params.id
      }
      )
  }

  ngOnChanges(){
    if(this.countSubs==this.fileList.length){
      window.location.reload();
    }
  }

  openForm(){
    document.getElementById('myModal5').style.display = "block"
  }
  closeForm(){
    document.getElementById('myModal5').style.display = "none"
  }

  fileChange(event) {//añade las imagenes a la lista de imagenes
    let fileList = event.target.files;
    if(fileList.length > 0) {
        this.file = fileList[0];
        
    }
    console.log(this.fileList)
  }
  
  uploadChapter(form: NgForm){
    console.log(this.file)
    this.lists.uploadChapter(
      form.value.name,
      form.value.number,
      this.fileList,
      this.currentUser.username,
      this.id
      ).subscribe(
        //response =>  window.location.reload(),//si ha ido bien el login
        response => this.uploadPages(response.chapter.id),
        error => console.log(error)//si no ha ido bien el login
      );
  }

  uploadPages(id){
   let count=1
   this.countSubs=0;
    for(let file of this.fileList){
      this.lists.uploadPage(
        id,
        count,
        file,
      ).subscribe(
        //response =>  window.location.reload(),//si ha ido bien el login
        () => {
          this.countSubs++;
        if(this.countSubs==this.fileList.length){
          window.location.reload()//actualiza la pagina cuando ha terminado de subir todas las paginas del capitulo
        }
      }
      );
      count++
    }

    //window.location.reload()//despues de subir todas las paginas
  }

  addPage(){//cada vez que clicamos añadir pagina se muestra el feedback al usuario de que se ha añadido mostrando el nombre de la imagen

    if(this.file!=null){
      this.fileList.push(this.file);
      this.pageCount++;
      
      // var para = document.createElement("p");
      // var node = document.createTextNode(this.pageCount+": "+this.fileList[this.pageCount-1].name);
      // para.appendChild(node);

      // document.getElementById("chapter-modal-body").appendChild(para);
    }
  }

  removePage(){
    if(this.fileList){
      this.fileList.pop();
      this.pageCount--;
      
      //en proseso
    }
  }

}
