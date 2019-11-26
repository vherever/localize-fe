import {Injectable} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginCredentialsModel } from '../../models/login-credentials.model';

@Injectable()
export class LoginApiService {
  constructor(
    private http: HttpClient,
  ) {}

  login(req: LoginCredentialsModel): Observable<HttpResponse<any>> {
    return this.http.post(environment.apiUrl + '/auth/signin', req, {observe: 'response'}) as Observable<HttpResponse<any>>;
  }
}
