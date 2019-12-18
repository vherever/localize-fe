import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// app imports
import { AuthService } from '../api/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
}
