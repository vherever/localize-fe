import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// app imports
import { ErrorModel } from '../../models/error.model';
import { ObjectLocalStorageService } from '../storage/object-local-storage.service';
import { AppVariables } from '../../static/app-variables';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private objectLocalStorageService: ObjectLocalStorageService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    const error: ErrorModel | any = err.error;
    if (error.message && error.message.length) {
      if (error.statusCode === 4041) {
        this.router.navigate(['404']);
      }
      return throwError(error);
    } else if (error.statusCode === 401) {
      this.objectLocalStorageService.removeItem(AppVariables.LOCAL_STORAGE_USER_ACCESS_TOKEN);
      this.objectLocalStorageService.removeItem(AppVariables.LOCAL_STORAGE_USER_CONFIG);
      this.router.navigate(['auth/login']);
    }
    return throwError(err.message);
  }
}
