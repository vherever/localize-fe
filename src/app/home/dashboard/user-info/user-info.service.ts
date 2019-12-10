import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { UserApiService } from '../../../core/api/services/user-api.service';
import { UserModel } from '../../../core/models/user.model';

@Injectable()
export class UserInfoService {
  constructor(
    private userApiService: UserApiService,
  ) {
  }

  getUserData(id: number): Observable<UserModel> {
    return this.userApiService.getUserData(id);
  }
}
