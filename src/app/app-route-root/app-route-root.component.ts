import { Component, OnInit } from '@angular/core';
import { CacheService } from '@ngx-cache/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// app imports
import { UserModel } from '../core/models/user.model';
import { UserInfoService } from '../home/dashboard/user-info/user-info.service';
import { AuthService } from '../core/api/services/auth.service';

@Component({
  selector: 'app-app-route-root',
  templateUrl: './app-route-root.component.html',
  styleUrls: ['app-route-root.component.scss'],
})
export class AppRouteRootComponent implements OnInit {
  constructor(
    private userInfoService: UserInfoService,
    private authService: AuthService,
    private cacheService: CacheService,
    private pubSubService: NgxPubSubService,
  ) {}

  ngOnInit() {
    this.cacheUserData();
  }

  private cacheUserData(): void {
    const userId = this.authService.decodeToken().id;
    this.userInfoService.getUserData(userId)
      .subscribe((res: UserModel) => {
        this.cacheService.set('userData', res);
        this.pubSubService.publishEvent('userDataCached', true);
      });
  }
}
