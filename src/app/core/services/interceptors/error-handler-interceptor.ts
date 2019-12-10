import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// app imports
import { ErrorModel } from '../../models/error.model';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  private async handleError(err: HttpErrorResponse): Promise<any> {
    const error: ErrorModel | any = err.error;
    if (error.message && error.message.length) {
      if (error.statusCode === 404) {
        await this.router.navigate(['404']);
      }
      return await throwError(error);
    }
    return await throwError(err.message);
  }
}
