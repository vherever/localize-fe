import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// app imports
import { RegisterCredentialsModel } from '../../models/register-credentials.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class RegisterApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  register(req: RegisterCredentialsModel): Observable<HttpResponse<any>> {
    return this.http.post(environment.apiUrl + '/auth/signup', req) as Observable<HttpResponse<any>>;
  }
}
