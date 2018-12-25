import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersGuardService {

  constructor(public userService: UsersService, public router: Router) { }

  canActivate(): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
