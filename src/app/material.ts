import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '../../node_modules/@angular/core';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule],
})
export class CustomMaterialModule { }