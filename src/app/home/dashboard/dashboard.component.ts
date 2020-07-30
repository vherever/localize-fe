import { Component, OnDestroy, OnInit } from '@angular/core';
// import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { UserModel } from '../../core/models/user.model';
// import { AppDataGlobalStorageService } from '../../core/services/app-data-global-storage.service';

@Component({
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  userData: UserModel;

  constructor(
    // private appDataGlobalStorageService: AppDataGlobalStorageService,
  ) {
  }

  ngOnInit() {
    // this.appDataGlobalStorageService.userData
    //   .pipe(untilComponentDestroyed(this))
    //   .subscribe((res: UserModel) => {
    //     this.userData = res;
    //   });
  }

  ngOnDestroy() {
  }
}
