import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './users/user-registration/user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { UsersGuardService } from './services/users-guard.service';
import { ListsComponent } from './lists/lists.component';

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    DashboardComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    })
  ],
  providers: [UsersService, UsersGuardService, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
