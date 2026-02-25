import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/user/profile/profile.module')
        .then(m => m.ProfileModule)
  },

  {
    path: 'browse',
    loadChildren: () =>
      import('./modules/music/browse/browse.module')
        .then(m => m.BrowseModule)
  },

  {
    path: 'favorites',
    loadChildren: () =>
      import('./modules/user/favorites/favorites.module')
        .then(m => m.FavoritesModule)
  },

  {
    path: 'playlists',
    loadChildren: () =>
      import('./modules/user/playlists/playlists.module')
        .then(m => m.PlaylistsModule)
  },

  { path: '', redirectTo: 'browse', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}