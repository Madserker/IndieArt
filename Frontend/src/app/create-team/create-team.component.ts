import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListsService } from '../lists.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.less'],
  providers: [ListsService]
})
export class CreateTeamComponent implements OnInit {
  id
  file:File
  fileList:File [] = []

  constructor(private router : Router, private lists : ListsService) { }

  ngOnInit() {
  }

  fileChange(event) {//añade las imagenes a la lista de imagenes
    let fileList = event.target.files;
    if(fileList.length > 0) {
        this.file = fileList[0];
        
    }
  }

  createTeam(form: NgForm){
    console.log(form.value.team)
    console.log(form.value.desc)
    console.log(form.value.role)
    console.log(this.file)
    this.lists.createTeam(
       form.value.team,
       form.value.desc,
       form.value.role,
       this.file
      ).subscribe(
        response =>         this.router.navigateByUrl("/");
        error => console.log(error)//si no ha ido bien el login
      );
  }

}
