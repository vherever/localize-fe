import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { UserInfoService } from './user-info.service';
import { UserModel } from '../../../core/models/user.model';
import { AuthService } from '../../../core/api/services/auth.service';

@Component({
  templateUrl: 'user-info.component.html',
})
export class UserInfoComponent implements OnInit, OnDestroy {
  userData: UserModel;

  constructor(
    private userInfoService: UserInfoService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.getUserData();
  }

  ngOnDestroy() {}

  private getUserData(): void {
    const userId = this.authService.decodeToken().id;
    this.userInfoService.getUserData(userId)
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: UserModel) => {
        this.userData = res;
      });
  }
}
