import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  private registerForm:FormGroup;
  private errorMessage:string;
  
  constructor(private router: Router, private fb: FormBuilder, private usersService: UsersService) {
    if (this.usersService.isAuthenticated()) { 
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  onFormSubmit(form:FormGroup) {
    const form_data:IUser = {
      "username" : form.controls['username'].value,
      "password" : form.controls['password'].value
    }
    
    this.usersService.createUser(form_data)
      .subscribe(res => {
        this.router.navigate(['/login']);
      }, (err) => {
        console.log(err);
        this.errorMessage = "There was an error trying to register."
      });
  }

}
