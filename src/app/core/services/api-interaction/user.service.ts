import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { UserApiService } from '../api/user-api.service';
import { UserModel } from '../../models/user.model';
import { UpdateUserReqModel } from '../../models/req-body/update-user-req.model';
import { delay } from 'rxjs/operators';

const delay_ms = 2000;

@Injectable()
export class UserService {
  constructor(
    private userApiService: UserApiService,
  ) {
  }

  getUserData(uuid: string): Observable<UserModel> {
    return this.userApiService.getUserData(uuid)
      .pipe(
        delay(delay_ms),
      );
  }

  updateUser(uuid: string, data: UpdateUserReqModel): Observable<UserModel> {
    return this.userApiService.updateUser(uuid, data)
      .pipe(
        delay(delay_ms),
      );
  }

  // uuid: string, file: any
  uploadAvatar(uuid: string, file: any): Observable<any> {
    return this.userApiService.uploadAvatar(uuid, file);
  }
}
