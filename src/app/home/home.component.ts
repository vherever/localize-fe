import { Component, OnDestroy, OnInit } from '@angular/core';
import { CacheService } from '@ngx-cache/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { UserService } from '../core/services/api-interaction/user.service';
import { AuthService } from '../core/services/api/auth.service';
import { UserModel } from '../core/models/user.model';
import { LocalesService } from '../core/services/api-interaction/locales.service';
import { AppDataGlobalStorageService } from '../core/services/app-data-global-storage.service';
import { LocalesModel } from '../core/models/locales.model';
import { LocalesHelper } from '../core/helpers/locales-helper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent extends LocalesHelper implements OnInit, OnDestroy {
  constructor(
    private userInfoService: UserService,
    private localesService: LocalesService,
    private authService: AuthService,
    private cacheService: CacheService,
    private pubSubService: NgxPubSubService,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
  ) {
    super();
  }

  ngOnInit() {
    this.getUserDataAndCache();
    this.getLocalesAndCache();
  }

  ngOnDestroy() {
  }

  private getUserDataAndCache(): void {
    const token = this.authService.decodeToken();
    if (token) {
      this.userInfoService.getUserData(token.id)
        .pipe(untilComponentDestroyed(this))
        .subscribe((res: UserModel) => {
          this.cacheService.set('userData', res);
          this.pubSubService.publishEvent('userDataCached', true);
        });
    }
  }

  private getLocalesAndCache(): void {
    this.localesService.getLocales()
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: LocalesModel) => {
        const formattedData = this.formatData(res);
        // console.log('___ formattedData', formattedData); // todo
        this.cacheService.set('localesData', formattedData);
        this.pubSubService.publishEvent('localesDataCached', true);
      });
  }
}
