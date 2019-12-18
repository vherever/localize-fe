import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/api-interaction/user.service';
import { AuthService } from '../core/services/api/auth.service';
import { CacheService } from '@ngx-cache/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { UserModel } from '../core/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private userInfoService: UserService,
    private authService: AuthService,
    private cacheService: CacheService,
    private pubSubService: NgxPubSubService,
  ) {}

  ngOnInit() {
    this.cacheUserData();
  }

  private cacheUserData(): void {
    const token = this.authService.decodeToken();
    if (token) {
      this.userInfoService.getUserData(token.id)
        .subscribe((res: UserModel) => {
          this.cacheService.set('userData', res);
          this.pubSubService.publishEvent('userDataCached', true);
        });
    }
  }
}
