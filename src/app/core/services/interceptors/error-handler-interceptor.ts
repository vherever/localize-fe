import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// app imports
import { ErrorModel } from '../../models/error.model';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    const error: ErrorModel | any = err.error;
    if (error.message && error.message.length) {
      return throwError(error);
    }
    return throwError(err.message);
  }
}
