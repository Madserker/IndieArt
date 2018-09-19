import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './material';
import { ToolbarNotLoggedComponent } from './toolbar-not-logged/toolbar-not-logged.component';
import { ListSideNavComponent } from './list-side-nav/list-side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarNotLoggedComponent,
    ListSideNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
