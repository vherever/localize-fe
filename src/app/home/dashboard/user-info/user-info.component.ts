import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CacheService } from '@ngx-cache/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// app imports
import { UserModel } from '../../../core/models/user.model';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: 'user-info.component.html',
  styleUrls: ['user-info.component.scss'],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  private sub1: Subscription;

  userData: UserModel;
  uploadsEndpoint: string;

  constructor(
    private cacheService: CacheService,
    private pubSubService: NgxPubSubService,
  ) {
  }

  ngOnInit() {
    if (!this.userData) {
      this.sub1 = this.pubSubService
        .subscribe('userDataCached', () => {
          this.userData = this.cacheService.get('userData');
        });
    }
    this.userData = this.cacheService.get('userData');
    this.uploadsEndpoint = `${environment.apiUrl}/uploads`;
  }

  ngOnDestroy() {
    if (this.sub1) { this.sub1.unsubscribe(); }
  }

  onAvatarUpdated(fileName: string): void {
    this.userData.avatar = null;
    setTimeout(() => {
      this.userData.avatar = fileName;
    }, 1);
  }
}
