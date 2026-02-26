import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongListComponent } from './pages/song-list/song-list.component';
import { SongDetailComponent } from './pages/song-detail/song-detail.component';
import { ArtistProfileComponent } from './pages/artist-profile/artist-profile.component';
import { AlbumProfileComponent } from './pages/album-profile/album-profile.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongDetailComponent,
    ArtistProfileComponent,
    AlbumProfileComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
