import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent as UserDashboardComponent } from './modules/user/dashboard/dashboard.component';
import { DashboardComponent as ArtistDashboardComponent } from './modules/artist/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';

const routes: Routes = [
  {
<<<<<<< HEAD
    path: 'artist',
    loadChildren: () =>
      import('./modules/artist/artist.module').then(m => m.ArtistModule)
  },
  { path: '', redirectTo: 'artist', pathMatch: 'full' }
=======
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { role: 'USER' },
  },
  {
    path: 'artist/dashboard',
    component: ArtistDashboardComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { role: 'ARTIST' },
  },
  { path: '', redirectTo: 'home/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'home/login' },
>>>>>>> origin/develop
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
<<<<<<< HEAD
export class AppRoutingModule { }
=======
export class AppRoutingModule {}
>>>>>>> origin/develop
