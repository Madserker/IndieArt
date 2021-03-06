import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '../../node_modules/@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatDividerModule, MatRadioModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatSidenavModule, MatDividerModule, MatRadioModule],
})
export class CustomMaterialModule { }