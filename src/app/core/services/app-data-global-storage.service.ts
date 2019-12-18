import { Injectable } from '@angular/core';
import { CacheService } from '@ngx-cache/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { UserModel } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppDataGlobalStorageService {
  private userData_: BehaviorSubject<UserModel> = new BehaviorSubject(null);

  constructor(
    private pubSubService: NgxPubSubService,
    private cacheService: CacheService,
  ) {
  }

  get userData(): Observable<UserModel> {
    let cachedData = this.cacheService.get('userData');
    if (!cachedData) {
      this.pubSubService
        .subscribe('userDataCached', () => {
          cachedData = this.cacheService.get('userData');
          this.userData_.next(cachedData);
        });
    }
    return this.userData_.asObservable();
  }
}
