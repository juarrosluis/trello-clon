import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpRequest, HttpParams } from '@angular/common/http';

import { UsersService } from './users.service';
import { IUser } from '../interfaces/user';

describe('UsersService', () => {
  beforeEach(() => 
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        UsersService
      ]  
    })
  );

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });

  it(`should send an expected register request`, async(inject([UsersService, HttpTestingController],
    (service: UsersService, backend: HttpTestingController) => {
      const valid_user:IUser = {"username":"username", "password":"password"};
      service.createUser(valid_user).subscribe();

      backend.expectOne((req: HttpRequest<any>) => {
        const body = new HttpParams({ fromObject: req.body });

        return req.url === 'https://apitrello.herokuapp.com/users'
          && req.method === 'POST'
          && req.headers.get('Content-Type') === 'application/json'
          && body.get('username') === 'username'
          && body.get('password') === 'password';
      }, `POST to 'users' with user and password`);
  })));
});
