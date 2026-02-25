import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'artist',
    loadChildren: () =>
      import('./modules/artist/artist.module').then(m => m.ArtistModule)
  },
  { path: '', redirectTo: 'artist', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }