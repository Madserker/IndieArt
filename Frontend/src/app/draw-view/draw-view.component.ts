import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Draw } from '../_models/Draw.interface';
import { DrawServiceService } from '../draw-service.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-draw-view',
  templateUrl: './draw-view.component.html',
  styleUrls: ['./draw-view.component.less'],
  providers: [DrawServiceService]
})
export class DrawViewComponent implements OnInit {

draw : Draw;
id:number;
draws : Draw[];


  constructor(private route: ActivatedRoute,private drawService: DrawServiceService) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        console.log(params.id) //params = draw.id
        this.id = params.id;
      }
    )
    this.drawService.getDrawById(this.id)
    .subscribe(result => {
    this.draw = result as Draw
    console.log(this.draw)
    })

  }

}