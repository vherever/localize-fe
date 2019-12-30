import { Injectable } from '@angular/core';
import { CacheService } from '@ngx-cache/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { UserModel } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectModel } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class AppDataGlobalStorageService {
  private userData_: BehaviorSubject<UserModel> = new BehaviorSubject(null);
  private userProjects_: BehaviorSubject<{owned: ProjectModel[], shared: ProjectModel[]}> = new BehaviorSubject(null);

  constructor(
    private pubSubService: NgxPubSubService,
    private cacheService: CacheService,
  ) {
  }

  // @ts-ignore
  set userProjects(data: {owned: ProjectModel[], shared: ProjectModel[]}) {
    this.userProjects_.next(null);
    this.userProjects_.next(data);
  }

  // @ts-ignore
  get userProjects(): Observable<{owned: ProjectModel[], shared: ProjectModel[]}> {
    return this.userProjects_.asObservable();
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
