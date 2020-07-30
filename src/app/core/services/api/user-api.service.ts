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

  getUserData(uuid: string): Observable<UserModel> {
    return this.http.get(`${environment.apiUrl}/users/${uuid}`) as Observable<UserModel>;
  }

  updateUser(uuid: string, data: UpdateUserReqModel): Observable<UserModel> {
    return this.http.put(`${environment.apiUrl}/users/${uuid}`, data) as Observable<UserModel>;
  }

  uploadAvatar(uuid: string, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/${uuid}/avatar`, data) as Observable<any>;
  }
}
