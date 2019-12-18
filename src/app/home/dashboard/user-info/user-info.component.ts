import { Component, OnDestroy, OnInit } from '@angular/core';
import { CacheService } from '@ngx-cache/core';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { UserModel } from '../../../core/models/user.model';
import { environment } from '../../../../environments/environment';
import { AppDataGlobalStorageService } from '../../../core/services/app-data-global-storage.service';

@Component({
  templateUrl: 'user-info.component.html',
  styleUrls: ['user-info.component.scss'],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  userData: UserModel;
  uploadsEndpoint: string;

  constructor(
    private cacheService: CacheService,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
  ) {
  }

  ngOnInit() {
    this.appDataGlobalStorageService.userData
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: UserModel) => {
        this.userData = res;
      });

    this.uploadsEndpoint = `${environment.apiUrl}/uploads`;
  }

  ngOnDestroy() {
  }

  onAvatarUpdated(fileName: string): void {
    this.userData.avatar = null;
    setTimeout(() => {
      this.userData.avatar = fileName;
      this.cacheService.set('userData', this.userData);
    }, 1);
  }
}
