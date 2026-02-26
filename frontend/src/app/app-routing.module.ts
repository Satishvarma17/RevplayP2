import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent as UserDashboardComponent } from './modules/user/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';

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
    path: 'user/dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { role: 'USER' },
  },
  {
    path: 'artist',
    loadChildren: () =>
      import('./modules/artist/artist.module').then(m => m.ArtistModule),
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
