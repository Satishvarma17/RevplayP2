import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './browse.component';
import { SongDetailComponent } from './song-detail.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SongListComponent } from './song-list/song-list.component';
import { ArtistProfileComponent } from './artist-profile/artist-profile.component';
import { AlbumProfileComponent } from './album-profile/album-profile.component';


@NgModule({
  declarations: [
    BrowseComponent,
    SongDetailComponent,
    SearchBarComponent,
    SongListComponent,
    ArtistProfileComponent,
    AlbumProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowseRoutingModule
  ]
})
export class BrowseModule { }
