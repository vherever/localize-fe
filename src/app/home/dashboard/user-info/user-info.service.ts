import { Injectable } from '@angular/core';
import { UserApiService } from '../../../core/api/services/user-api.service';
import { Observable } from 'rxjs';
import { UserApiResponseModel } from '../../../core/api/models/user-api-response.model';

@Injectable()
export class UserInfoService {
  constructor(
    private userApiService: UserApiService,
  ) {}

  getUserData(id: number): Observable<UserApiResponseModel> {
    return this.userApiService.getUserData(id);
  }
}
