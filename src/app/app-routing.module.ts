import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationComponent } from './users/user-registration/user-registration.component';
import { UserLoginComponent } from './users/user-login/user-login.component';

const routes: Routes = [
  { 
    path: 'register', 
    component: UserRegistrationComponent
  },
  { 
    path: 'login', 
    component: UserLoginComponent
  },
  { path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
