import { Component, OnInit } from '@angular/core';
import { UserInfoService } from './user-info.service';
import { UserApiResponseModel } from '../../../core/api/models/user-api-response.model';

@Component({
  templateUrl: 'user-info.component.html',
})
export class UserInfoComponent implements OnInit {
  userData: UserApiResponseModel;

  constructor(
    private userInfoService: UserInfoService,
  ) {}

  ngOnInit() {
    this.getUserData(1);
  }

  private getUserData(id: number): void {
    this.userInfoService.getUserData(id)
      .subscribe((res: UserApiResponseModel) => {
        this.userData = res;
      });
  }
}
