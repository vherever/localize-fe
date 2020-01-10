import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// app imports
import { LoginApiService } from '../api/login-api.service';
import { LoginCredentialsModel } from '../../models/login-credentials.model';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../api/auth.service';
import { ErrorModel } from '../../models/error.model';

@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    private loginApiService: LoginApiService,
    private authService: AuthService,
  ) {
  }

  login(req: LoginCredentialsModel): Observable<any> {
    return this.loginApiService.login(req)
      .pipe(
        catchError((err: ErrorModel) => {
          return throwError(err);
        }),
        map((res: any) => this.authService.onLogIn(res.body.accessToken)),
      );
  }
}
