import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  private registerForm:FormGroup;
  
  constructor(private fb: FormBuilder, private usersService: UsersService) {}

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
    console.log("username: " + form_data.username);
    console.log("password: " + form_data.password);

    this.usersService.createUser(form_data)
      .subscribe(res => {
        console.log(res.status);
      }, (err) => {
        console.log(err);
      });
  }

}
