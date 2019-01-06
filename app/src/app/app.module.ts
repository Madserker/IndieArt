import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RouterModule, Route} from '@angular/router';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './material';
import { ToolbarNotLoggedComponent } from './components/toolbar-not-logged/toolbar-not-logged.component';
import { ListSideNavComponent } from './components/list-side-nav/list-side-nav.component';
import { ListComponent } from './components/list/list.component';
import { ImageComponent } from './components/image/image.component';
import { LoginSideNavComponent } from './components/login-side-nav/login-side-nav.component';
import { ListsViewComponent } from './components/lists-view/lists-view.component';

import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { ProfileViewComponent } from './components/profile/profile-view/profile-view.component';
import { ProfileViewImageComponent } from './components/profile/profile-view-image/profile-view-image.component';
import { ComicComponent } from './components/comic/comic.component';
import { UserComponent } from './components/user/user.component';
import { DrawViewComponent } from './components/draw-details-view/draw-view/draw-view.component';
import { DrawDetailsComponent } from './components/draw-details-view/draw-details/draw-details.component';
import { GalleryComponent } from './components/profile/gallery/gallery.component';
import { DrawListComponent } from './components/profile/draw-list/draw-list.component';
import { ComicListComponent } from './components/profile/comic-list/comic-list.component';
import { AnimationListComponent } from './components/profile/animation-list/animation-list.component';
import { AnimationComponent } from './components/animation/animation.component';
import { ComicViewComponent } from './components/comic-details-view/comic-view/comic-view.component';
import { AnimationViewComponent } from './components/animation-details-view/animation-view/animation-view.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { CommentComponent } from './components/comment/comment.component';
import { AuthService } from './services/auth.service';
import { AnimationDetailsComponent } from './components/animation-details-view/animation-details/animation-details.component';
import { EpisodeComponent } from './components/animation-details-view/episode/episode.component';
import { EpisodesViewComponent } from './components/animation-details-view/episodes-view/episodes-view.component';
import { EpisodesListComponent } from './components/animation-details-view/episodes-list/episodes-list.component';
import { ComicDetailsComponent } from './components/comic-details-view/comic-details/comic-details.component';
import { ChaptersViewComponent } from './components/comic-details-view/chapters-view/chapters-view.component';
import { ChaptersListComponent } from './components/comic-details-view/chapters-list/chapters-list.component';
import { ChapterComponent } from './components/comic-details-view/chapter/chapter.component';
import { ChapterViewerComponent } from './components/comic-details-view/chapter-viewer/chapter-viewer.component';
import { NewDrawComponent } from './components/profile/new-draw/new-draw.component';
import { NewComicComponent } from './components/profile/new-comic/new-comic.component';
import { NewAnimationComponent } from './components/profile/new-animation/new-animation.component';
import { NewEpisodeComponent } from './components/animation-details-view/new-episode/new-episode.component';
import { NewChapterComponent } from './components/comic-details-view/new-chapter/new-chapter.component';
import { FriendsActivityViewComponent } from './components/friends-activity/friends-activity-view/friends-activity-view.component';
import { FriendsActivityListComponent } from './components/friends-activity/friends-activity-list/friends-activity-list.component';
import { FriendsActivityNotificationComponent } from './components/friends-activity/friends-activity-notification/friends-activity-notification.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ChatRoomsViewComponent } from './components/chat-rooms/chat-rooms-view/chat-rooms-view.component';
import { TeamImageComponent } from './components/team-image/team-image.component';
import { ChatRoomsListComponent } from './components/chat-rooms/chat-rooms-list/chat-rooms-list.component';
import { TeamViewComponent } from './components/profile/team-view/team-view.component';
import { TeamViewImageComponent } from './components/profile/team-view-image/team-view-image.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { ManageTeamsListComponent } from './components/manage-teams/manage-teams-list/manage-teams-list.component';
import { ManageTeamsViewComponent } from './components/manage-teams/manage-teams-view/manage-teams-view.component';
import { ManageTeamsItemComponent } from './components/manage-teams/manage-teams-item/manage-teams-item.component';
import { ChatRoomsChatComponent } from './components/chat-rooms/chat-rooms-chat/chat-rooms-chat.component';
import { ChatViewerComponent } from './components/chat-rooms/chat-viewer/chat-viewer.component';
import { ChatMessagesListComponent } from './components/chat-rooms/chat-messages-list/chat-messages-list.component';
import { ChatMessageComponent } from './components/chat-rooms/chat-message/chat-message.component';
import {MatInputModule} from '@angular/material/input';
import { NewPrivateChatComponent } from './components/chat-rooms/new-private-chat/new-private-chat.component';
import { NewPublicChatComponent } from './components/chat-rooms/new-public-chat/new-public-chat.component';




//definimos las rutas desponibles en la aplicacion y las asociamos a un componente
const routes : Route[] = [
{path: '', component: ListsViewComponent},
{path: 'chat-rooms', component: ChatRoomsViewComponent},
{path: 'friends-activity', component: FriendsActivityViewComponent},
{path: 'competitions', component: ListsViewComponent},
{path: 'create-team', component: CreateTeamComponent},
{path: 'manage-teams', component: ManageTeamsViewComponent},

//rutas dinamicas
{path: 'draw/:id', component: DrawViewComponent},
{path: 'comic/:id', component: ComicViewComponent},
{path: 'animation/:id', component: AnimationViewComponent},
{path: 'user/:username', component: ProfileViewComponent},
{path: 'team/:username', component: TeamViewComponent},
{path: 'edit', component: EditProfileComponent},
{path: 'animation/:id/episodes', component: EpisodesViewComponent},
{path: 'comic/:id/chapters', component: ChaptersViewComponent},
{path: 'chat-rooms/:id', component: ChatViewerComponent},

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
    ChatRoomsViewComponent,
    TeamImageComponent,
    ChatRoomsListComponent,
    TeamViewComponent,
    TeamViewImageComponent,
    CreateTeamComponent,
    ManageTeamsListComponent,
    ManageTeamsViewComponent,
    ManageTeamsItemComponent,
    ChatRoomsChatComponent,
    ChatViewerComponent,
    ChatMessagesListComponent,
    ChatMessageComponent,
    NewPrivateChatComponent,
    NewPublicChatComponent


    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    MatInputModule,
    FormsModule, 
    HttpClientModule,
    HttpModule,
    
    RouterModule.forRoot(routes) //le pasamos las rutas disponibles en la aplicación
  ],


  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
