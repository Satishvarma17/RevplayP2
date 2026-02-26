import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'player',
    loadChildren: () =>
      import('./modules/player/player.module').then(m => m.PlayerModule)
  },

  {
    path: 'history',
    loadChildren: () =>
      import('./modules/history/history.module').then(m => m.HistoryModule)
  },

  { path: '', redirectTo: 'player', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
