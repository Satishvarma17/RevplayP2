import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse.component';
import { SongDetailComponent } from './song-detail.component';
import { SongListComponent } from './song-list/song-list.component';
import { ArtistProfileComponent } from './artist-profile/artist-profile.component';
import { AlbumProfileComponent } from './album-profile/album-profile.component';

const routes: Routes = [
  { path: '', component: BrowseComponent },
  { path: 'songs', component: SongListComponent },
  { path: 'artist/:id', component: ArtistProfileComponent },
  { path: 'album/:id', component: AlbumProfileComponent },
  { path: ':id', component: SongDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrowseRoutingModule {}
