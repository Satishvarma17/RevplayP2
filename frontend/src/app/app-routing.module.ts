import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/artist/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'artist/dashboard', pathMatch: 'full' },
  { path: 'artist/dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}