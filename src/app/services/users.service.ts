import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  responseType: 'text' as 'json',
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private usersApi = "http://localhost:1337/apitrello.herokuapp.com/users";
  private usersLoginApi = "http://localhost:1337/apitrello.herokuapp.com/users/login";
  
  constructor(public jwtHelper: JwtHelperService, private httpClient: HttpClient) {}

  public createUser(data:IUser): Observable<any> {
    return this.httpClient.post<any>(this.usersApi, data, httpOptions)
  }

  public retrieveUser(data:IUser): Observable<string> {
    return this.httpClient.post<string>(this.usersLoginApi, data, httpOptions)
  }

  public isAuthenticated(): boolean {
    if(localStorage.length > 0) {
      const token:string = localStorage.getItem('id_token');
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
}
