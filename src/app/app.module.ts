import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RouterModule, Route} from '@angular/router';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './material';
import { ToolbarNotLoggedComponent } from './toolbar-not-logged/toolbar-not-logged.component';
import { ListSideNavComponent } from './list-side-nav/list-side-nav.component';
import { ListComponent } from './list/list.component';
import { ImageComponent } from './image/image.component';
import { LoginSideNavComponent } from './login-side-nav/login-side-nav.component';
import { WorkOffersComponent } from './work-offers/work-offers.component';
import { ListsViewComponent } from './lists-view/lists-view.component';

import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { FriendsActivityComponent } from './friends-activity/friends-activity.component';

//definimos las rutas desponibles en la aplicacion y las asociamos a un componente
const routes : Route[] = [
{path: '', component: ListsViewComponent},
{path: 'chat-rooms', component: WorkOffersComponent},
{path: 'friends-activity', component: FriendsActivityComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ToolbarNotLoggedComponent,
    ListSideNavComponent,
    ListComponent,
    ImageComponent,
    LoginSideNavComponent,
    WorkOffersComponent,
    ListsViewComponent,
    FriendsActivityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule, 
    HttpModule,

    RouterModule.forRoot(routes) //le pasamos las rutas disponibles en la aplicación
  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
