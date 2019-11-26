import { Injectable } from '@angular/core';
import { AuthService } from '../../core/api/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegisterCredentialsModel } from '../../core/models/register-credentials.model';
import { Observable, throwError } from 'rxjs';
import { RegisterApiService } from '../../core/api/services/register-api.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class RegisterService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private registerApiService: RegisterApiService,
  ) {}

  register(req: RegisterCredentialsModel): Observable<any> {
    return this.registerApiService.register(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }),
        map(res => 'success'),
      );
  }
}
