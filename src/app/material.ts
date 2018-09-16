import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '../../node_modules/@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule],
  exports: [MatButtonModule, MatCheckboxModule],
})
export class CustomMaterialModule { }