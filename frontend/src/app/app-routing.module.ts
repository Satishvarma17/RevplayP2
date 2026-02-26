import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent as ArtistDashboardComponent } from './modules/artist/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';

const userOnly = {
  canActivate: [AuthGuard, roleGuard],
  data: { role: 'USER' },
};

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'browse',
    loadChildren: () =>
      import('./modules/music/browse/browse.module').then((m) => m.BrowseModule),
    ...userOnly,
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./modules/user/favorites/favorites.module').then((m) => m.FavoritesModule),
    ...userOnly,
  },
  {
    path: 'playlists',
    loadChildren: () =>
      import('./modules/user/playlists/playlists.module').then((m) => m.PlaylistsModule),
    ...userOnly,
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/user/profile/profile.module').then((m) => m.ProfileModule),
    ...userOnly,
  },
  {
    path: 'user/dashboard',
    redirectTo: 'browse',
    pathMatch: 'full',
  },
  {
    path: 'artist/dashboard',
    component: ArtistDashboardComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { role: 'ARTIST' },
  },
  { path: '', redirectTo: 'home/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'home/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
