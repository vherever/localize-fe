import { Injectable } from '@angular/core';
import { CacheService } from '@ngx-cache/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// app imports
import { UserModel } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectModel } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class AppDataGlobalStorageService {
  private userData_: BehaviorSubject<UserModel> = new BehaviorSubject(null);
  private currentProject_: BehaviorSubject<ProjectModel> = new BehaviorSubject(null);

  constructor(
    private pubSubService: NgxPubSubService,
    private cacheService: CacheService,
  ) {
  }

  // @ts-ignore
  set currentProject(project: ProjectModel) {
    this.currentProject_.next(project);
  }

  // @ts-ignore
  get currentProject(): Observable<ProjectModel> {
    return this.currentProject_.asObservable();
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
