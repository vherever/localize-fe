import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { UserApiService } from '../api/user-api.service';
import { UserModel } from '../../models/user.model';
import { UpdateUserReqModel } from '../../models/req-body/update-user-req.model';

@Injectable()
export class UserService {
  constructor(
    private userApiService: UserApiService,
  ) {
  }

  getUserData(id: number): Observable<UserModel> {
    return this.userApiService.getUserData(id);
  }

  updateUser(id: number, data: UpdateUserReqModel): Observable<UserModel> {
    return this.userApiService.updateUser(id, data);
  }

  uploadAvatar(id: number, file: any): Observable<any> {
    return this.userApiService.uploadAvatar(id, file);
  }
}
