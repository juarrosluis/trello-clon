import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './users/user-registration/user-registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { UsersGuardService } from './services/users-guard.service';
import { ListsComponent } from './lists/lists.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InterceptorService } from './services/interceptor.service';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarContainer, MatSnackBarModule, MatFormFieldModule, MatDialogModule, MatInputModule } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksComponent } from './tasks/tasks.component';
import { ModalComponent } from './modal/modal.component';


export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    DashboardComponent,
    ListsComponent,
    SnackbarComponent,
    TasksComponent,
    ModalComponent
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
    }),
    DragDropModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatInputModule
  ],
  entryComponents: [ModalComponent],
  providers: [UsersService, UsersGuardService, JwtHelperService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
