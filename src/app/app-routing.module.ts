import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationComponent } from './users/user-registration/user-registration.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersGuardService as AuthGuard } from './services/users-guard.service';

const routes: Routes = [
  { 
    path: 'register', 
    component: UserRegistrationComponent
  },
  { 
    path: 'login', 
    component: UserLoginComponent
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard] 
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
