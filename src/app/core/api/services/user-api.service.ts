import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// app imports
import { environment } from '../../../../environments/environment';
import { UserApiResponseModel } from '../models/user-api-response.model';

@Injectable()
export class UserApiService {
  constructor(
    private http: HttpClient,
  ) {}

  getUserData(id: number): Observable<UserApiResponseModel> {
    return this.http.get(`${environment.apiUrl}/users/${id}`) as Observable<UserApiResponseModel>;
  }
}
