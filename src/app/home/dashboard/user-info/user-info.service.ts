import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { UserApiService } from '../../../core/api/services/user-api.service';
import { UserModel } from '../../../core/models/user.model';
import { UpdateUserReqModel } from '../../../core/models/req-body/update-user-req.model';

@Injectable()
export class UserInfoService {
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
}
