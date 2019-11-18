import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// app imports
import { LoginApiService } from '../../core/api/services/login-api.service';
import { LoginCredentialsModel } from '../../core/api/models/login-credentials.model';
import { UserConfigService } from '../../core/services/user-config/user-config.service';
import { catchError, concatMap, map } from 'rxjs/operators';

@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    private loginApiService: LoginApiService,
    private userConfigService: UserConfigService,
  ) {
  }

  login(req: LoginCredentialsModel): Observable<any> {
    return this.loginApiService.login(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }),
        map(res => this.userConfigService.onLogIn(res.body.accessToken))
      );
  }
}
