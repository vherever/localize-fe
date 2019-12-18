import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from '@ngx-cache/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { AuthService } from '../core/api/services/auth.service';
import { UserModel } from '../core/models/user.model';
import { environment } from '../../environments/environment';
import { AppDataGlobalStorageService } from '../core/services/app-data-global-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  userData: UserModel;
  uploadsEndpoint: string;

  constructor(
    private authService: AuthService,
    private cacheService: CacheService,
    private pubSubService: NgxPubSubService,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.uploadsEndpoint = `${environment.apiUrl}/uploads`;

    this.appDataGlobalStorageService.userData
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: UserModel) => {
      this.userData = res;
    });

    this.isAuthenticated = this.authService.isAuthenticated();
    this.pubSubService.subscribe('isAuthenticated', (state: boolean) => {
      this.isAuthenticated = state;
      if (state) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  ngOnDestroy() {
  }

  onLogOutClick(): void {
    this.cacheService.set('userData', null);
    this.authService.onLogOut();
    this.pubSubService.publishEvent('isAuthenticated', false);
  }

  onAccountSettingsClick(): void {
    this.pubSubService.publishEvent('accountSettingsDialogOpened', true);
  }
}
