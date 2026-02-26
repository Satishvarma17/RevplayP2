import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongListComponent } from './pages/song-list/song-list.component';
import { SongDetailComponent } from './pages/song-detail/song-detail.component';
import { ArtistProfileComponent } from './pages/artist-profile/artist-profile.component';
import { AlbumProfileComponent } from './pages/album-profile/album-profile.component';

const routes: Routes = [
  { path: '', component: SongListComponent },
  { path: 'search', component: SongListComponent },
  { path: 'song/:id', component: SongDetailComponent },
  { path: 'artist/:id', component: ArtistProfileComponent },
  { path: 'album/:id', component: AlbumProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}