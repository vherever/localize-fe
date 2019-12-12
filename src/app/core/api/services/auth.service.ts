import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
// app imports
import { ObjectLocalStorageService } from '../../services/storage/object-local-storage.service';
import { AppVariables } from '../../static/app-variables';
import { TokenPayloadModel } from '../../models/token-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtHelperService: JwtHelperService,
    private objectLocalStorageService: ObjectLocalStorageService,
  ) {
  }

  get token(): string {
    return this.objectLocalStorageService.getItem(AppVariables.LOCAL_STORAGE_USER_ACCESS_TOKEN);
  }

  isAuthenticated(): boolean {
    return !this.jwtHelperService.isTokenExpired(this.token);
  }

  decodeToken(): TokenPayloadModel {
    return this.jwtHelperService.decodeToken(this.token);
  }

  onLogIn(token: string): string {
    this.objectLocalStorageService.setItem(AppVariables.LOCAL_STORAGE_USER_ACCESS_TOKEN, token);

    return 'success';
  }

  onLogOut(): void {
    this.objectLocalStorageService.removeItem(AppVariables.LOCAL_STORAGE_USER_ACCESS_TOKEN);
  }
}
