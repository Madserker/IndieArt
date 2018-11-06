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
import { ListsViewComponent } from './lists-view/lists-view.component';

import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { FriendsActivityComponent } from './friends-activity/friends-activity.component';
import { ChatRoomsComponent } from './chat-rooms/chat-rooms.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { ProfileViewImageComponent } from './profile/profile-view-image/profile-view-image.component';
import { ComicComponent } from './comic/comic.component';
import { UserComponent } from './user/user.component';
import { DrawViewComponent } from './draw-view/draw-view.component';
import { DrawDetailsComponent } from './draw-details/draw-details.component';
import { GalleryComponent } from './profile/gallery/gallery.component';
import { DrawListComponent } from './profile/draw-list/draw-list.component';
import { ComicListComponent } from './profile/comic-list/comic-list.component';
import { AnimationListComponent } from './profile/animation-list/animation-list.component';

//definimos las rutas desponibles en la aplicacion y las asociamos a un componente
const routes : Route[] = [
{path: '', component: ListsViewComponent},
{path: 'chat-rooms', component: ChatRoomsComponent},
{path: 'friends-activity', component: FriendsActivityComponent},
{path: 'competitions', component: ChatRoomsComponent},

//rutas dinamicas
{path: 'draw/:id', component: DrawViewComponent},
{path: 'user/:username', component: ProfileViewComponent},

//{path: '/profile/:username', component: ListsViewComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ToolbarNotLoggedComponent,
    ListSideNavComponent,
    ListComponent,
    ImageComponent,
    LoginSideNavComponent,
    ListsViewComponent,
    FriendsActivityComponent,
    ChatRoomsComponent,
    ProfileViewComponent,
    ComicComponent,
    UserComponent,
    DrawViewComponent,
    DrawDetailsComponent,
    ProfileViewImageComponent,
    GalleryComponent,
    DrawListComponent,
    ComicListComponent,
    AnimationListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule, 
    HttpClientModule,
    HttpModule,
    
    RouterModule.forRoot(routes) //le pasamos las rutas disponibles en la aplicación
  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
