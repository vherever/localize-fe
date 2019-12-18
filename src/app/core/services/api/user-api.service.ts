import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// app imports
import { environment } from '../../../../environments/environment';
import { UserModel } from '../../models/user.model';
import { UpdateUserReqModel } from '../../models/req-body/update-user-req.model';

@Injectable()
export class UserApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getUserData(id: number): Observable<UserModel> {
    return this.http.get(`${environment.apiUrl}/users/${id}`) as Observable<UserModel>;
  }

  updateUser(id: number, data: UpdateUserReqModel): Observable<UserModel> {
    return this.http.put(`${environment.apiUrl}/users/${id}`, data) as Observable<UserModel>;
  }

  uploadAvatar(id: number, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/${id}/avatar`, data) as Observable<any>;
  }
}
