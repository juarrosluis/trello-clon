import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  private loginForm:FormGroup;
  private errorMessage:string;

  constructor(private router: Router, private fb: FormBuilder, private usersService: UsersService) { }

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
    console.log("username: " + form_data.username);
    console.log("password: " + form_data.password);

    this.usersService.retrieveUser(form_data)
      .subscribe(res => {
        //this.router.navigate(['/dashboard']);
        console.log("Logged in")
        console.log(res)
      }, (err) => {
        console.log(err);
        this.errorMessage = "There was an error trying to log in."
      });
  }

}
