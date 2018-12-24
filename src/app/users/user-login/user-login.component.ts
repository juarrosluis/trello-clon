import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { IUser } from 'src/app/interfaces/user';
import * as moment from "moment";
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  private loginForm:FormGroup;
  private errorMessage:string;

  constructor(private router: Router, private fb: FormBuilder, private usersService: UsersService) {
    if (this.usersService.isAuthenticated()) { 
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  onFormSubmit(form:FormGroup) {
    const form_data:IUser = {
      "username" : form.controls['username'].value,
      "password" : form.controls['password'].value
    }

    this.usersService.retrieveUser(form_data)
      .subscribe(res => {
        if(res === null) {
          this.errorMessage = "There was an error trying to log in."
        }
        else {
          this.setSession(res);
          this.router.navigate(['/dashboard']);
        }
      }, (err) => {
        console.log(err);
        this.errorMessage = "There was an error trying to log in."
      });
  }

  private setSession(authResult) {
    const expiresAt = moment().add(3600,'second');

    localStorage.setItem('id_token', authResult);
    //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }  

  

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }    
}
