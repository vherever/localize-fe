import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// app imports
import { AuthService } from '../../core/api/services/auth.service';
import { RegisterCredentialsModel } from '../../core/models/register-credentials.model';
import { RegisterApiService } from '../../core/api/services/register-api.service';

@Injectable()
export class RegisterService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private registerApiService: RegisterApiService,
  ) {
  }

  register(req: RegisterCredentialsModel): Observable<any> {
    return this.registerApiService.register(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }),
        map(() => 'success'),
      );
  }
}
