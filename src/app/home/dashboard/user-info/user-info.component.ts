import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CacheService } from '@ngx-cache/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// app imports
import { UserModel } from '../../../core/models/user.model';

@Component({
  templateUrl: 'user-info.component.html',
})
export class UserInfoComponent implements OnInit, OnDestroy {
  private sub1: Subscription;

  userData: UserModel;

  constructor(
    private cacheService: CacheService,
    private pubSubService: NgxPubSubService,
  ) {
  }

  ngOnInit() {
    this.userData = this.cacheService.get('userData');
    if (!this.userData) {
      this.sub1 = this.pubSubService
        .subscribe('userDataCached', () => {
          this.userData = this.cacheService.get('userData');
        });
    }
  }

  ngOnDestroy() {
    if (this.sub1) { this.sub1.unsubscribe(); }
  }
}
