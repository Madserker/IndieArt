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

import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { ProfileViewImageComponent } from './profile/profile-view-image/profile-view-image.component';
import { ComicComponent } from './comic/comic.component';
import { UserComponent } from './user/user.component';
import { DrawViewComponent } from './draw-details-view/draw-view/draw-view.component';
import { DrawDetailsComponent } from './draw-details-view/draw-details/draw-details.component';
import { GalleryComponent } from './profile/gallery/gallery.component';
import { DrawListComponent } from './profile/draw-list/draw-list.component';
import { ComicListComponent } from './profile/comic-list/comic-list.component';
import { AnimationListComponent } from './profile/animation-list/animation-list.component';
import { AnimationComponent } from './animation/animation.component';
import { ComicViewComponent } from './comic-details-view/comic-view/comic-view.component';
import { AnimationViewComponent } from './animation-details-view/animation-view/animation-view.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentComponent } from './comment/comment.component';
import { AuthService } from './auth.service';
import { AnimationDetailsComponent } from './animation-details-view/animation-details/animation-details.component';
import { EpisodeComponent } from './animation-details-view/episode/episode.component';
import { EpisodesViewComponent } from './animation-details-view/episodes-view/episodes-view.component';
import { EpisodesListComponent } from './animation-details-view/episodes-list/episodes-list.component';
import { ComicDetailsComponent } from './comic-details-view/comic-details/comic-details.component';
import { ChaptersViewComponent } from './comic-details-view/chapters-view/chapters-view.component';
import { ChaptersListComponent } from './comic-details-view/chapters-list/chapters-list.component';
import { ChapterComponent } from './comic-details-view/chapter/chapter.component';
import { ChapterViewerComponent } from './comic-details-view/chapter-viewer/chapter-viewer.component';
import { NewDrawComponent } from './profile/new-draw/new-draw.component';
import { NewComicComponent } from './profile/new-comic/new-comic.component';
import { NewAnimationComponent } from './profile/new-animation/new-animation.component';
import { NewEpisodeComponent } from './animation-details-view/new-episode/new-episode.component';
import { NewChapterComponent } from './comic-details-view/new-chapter/new-chapter.component';
import { FriendsActivityViewComponent } from './friends-activity/friends-activity-view/friends-activity-view.component';
import { FriendsActivityListComponent } from './friends-activity/friends-activity-list/friends-activity-list.component';
import { FriendsActivityNotificationComponent } from './friends-activity/friends-activity-notification/friends-activity-notification.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { TeamViewComponent } from './team/team-view/team-view.component';
import { ChatRoomsViewComponent } from './chat-rooms/chat-rooms-view/chat-rooms-view.component';
import { TeamImageComponent } from './team-image/team-image.component';

//definimos las rutas desponibles en la aplicacion y las asociamos a un componente
const routes : Route[] = [
{path: '', component: ListsViewComponent},
{path: 'chat-rooms', component: ChatRoomsViewComponent},
{path: 'friends-activity', component: FriendsActivityViewComponent},
{path: 'competitions', component: ListsViewComponent},

//rutas dinamicas
{path: 'draw/:id', component: DrawViewComponent},
{path: 'comic/:id', component: ComicViewComponent},
{path: 'animation/:id', component: AnimationViewComponent},
{path: 'user/:username', component: ProfileViewComponent},
{path: 'edit', component: EditProfileComponent},
{path: 'animation/:id/episodes', component: EpisodesViewComponent},
{path: 'comic/:id/chapters', component: ChaptersViewComponent},

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
    AnimationComponent,
    ComicViewComponent,
    AnimationViewComponent,
    CommentsListComponent,
    CommentComponent,
    AnimationDetailsComponent,
    EpisodeComponent,
    EpisodesViewComponent,
    EpisodesListComponent,
    ComicDetailsComponent,
    ComicViewComponent,
    ChaptersViewComponent,
    ChaptersListComponent,
    ChapterComponent,
    ChapterViewerComponent,
    NewDrawComponent,
    NewComicComponent,
    NewAnimationComponent,
    NewEpisodeComponent,
    NewChapterComponent,
    FriendsActivityViewComponent,
    FriendsActivityListComponent,
    FriendsActivityNotificationComponent,
    EditProfileComponent,
    TeamViewComponent,
    ChatRoomsViewComponent,
    TeamImageComponent,

    
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


  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
