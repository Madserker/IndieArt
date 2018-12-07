import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-private-chat',
  templateUrl: './new-private-chat.component.html',
  styleUrls: ['./new-private-chat.component.less']
})
export class NewPrivateChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openForm(){
    document.getElementById('myModal7').style.display = "block"
}
closeForm(){
  document.getElementById('myModal7').style.display = "none"
}


}
