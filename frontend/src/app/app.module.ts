import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
=======
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
>>>>>>> origin/develop

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardComponent as UserDashboardComponent } from './modules/user/dashboard/dashboard.component';
import { DashboardComponent as ArtistDashboardComponent } from './modules/artist/dashboard/dashboard.component';
import { HomeComponent } from './modules/home/home.component';

@NgModule({
  declarations: [AppComponent, UserDashboardComponent, ArtistDashboardComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    HttpClientModule
=======
    AuthModule,
    HttpClientModule,
    FormsModule,
>>>>>>> origin/develop
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
<<<<<<< HEAD
export class AppModule { }
=======
export class AppModule {}
>>>>>>> origin/develop
