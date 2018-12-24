import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersApi = " http://localhost:1337/apitrello.herokuapp.com/users";
  private usersLoginApi = " http://localhost:1337/apitrello.herokuapp.com/users/login";
  
  constructor(private httpClient: HttpClient) {}

  public createUser(data:IUser): Observable<any> {
    return this.httpClient.post<any>(this.usersApi, data, httpOptions)
  }

  public retrieveUser(data:IUser): Observable<any> {
    return this.httpClient.post<any>(this.usersLoginApi, data, httpOptions)
  }
}
