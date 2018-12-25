import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationComponent } from './user-registration.component';
import { FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegistrationComponent ],
      providers: [ FormBuilder, UsersService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
