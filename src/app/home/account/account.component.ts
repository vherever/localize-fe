import { Component, OnDestroy, OnInit } from '@angular/core';
import { CacheService } from '@ngx-cache/core';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { UserModel } from '../../core/models/user.model';
import { AppDataGlobalStorageService } from '../../core/services/app-data-global-storage.service';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  userData: UserModel;
  uploadsEndpoint: string;

  constructor(
    private cacheService: CacheService,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
  ) {
  }

  ngOnInit() {
    this.uploadsEndpoint = `${environment.apiUrl}/uploads`;

    this.appDataGlobalStorageService.userData
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: UserModel) => {
        this.userData = res;
      });
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
