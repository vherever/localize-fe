import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
// app imports
import { ObjectLocalStorageService } from '../storage/object-local-storage.service';
import { AppVariables } from '../../static/app-variables';
import { TokenPayloadModel } from '../../models/token-payload.model';
import { AppStateModel } from '../../../store/models/app-state.model';
import { ClearUserAction } from '../../../store/actions/user.actions';
import { ClearProjectsAction } from '../../../store/actions/projects.actions';

@Injectable()
export class AuthService {
  constructor(
    private jwtHelperService: JwtHelperService,
    private objectLocalStorageService: ObjectLocalStorageService,
    private store: Store<AppStateModel>,
  ) {
  }

  get token(): string {
    const value = this.objectLocalStorageService.getRawItem(AppVariables.LOCAL_STORAGE_USER_ACCESS_TOKEN);
    if (!this.objectLocalStorageService.isJsonString(value)) {
      this.onLogOut();
    }
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
    this.objectLocalStorageService.removeItem(AppVariables.LOCAL_STORAGE_USER_CONFIG);
    this.store.dispatch(new ClearUserAction());
    this.store.dispatch(new ClearProjectsAction());
  }
}
