import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { Subscription } from 'rxjs';
// app imports
import { UserInfoDialogComponent } from '../../../home/user-info-dialog/user-info-dialog.component';
import { UserModel } from '../../models/user.model';
import { CacheService } from '@ngx-cache/core';

@Component({
  selector: 'app-pub-sub-events-handler',
  templateUrl: 'pub-sub-events-handler.component.html',
})
export class PubSubEventsHandlerComponent implements OnInit, OnDestroy {
  private userData: UserModel;
  private sub1: Subscription;
  private sub2: Subscription;

  constructor(
    private pubSubService: NgxPubSubService,
    private cacheService: CacheService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.sub2 = this.pubSubService
      .subscribe('userDataCached', () => {
        this.userData = this.cacheService.get('userData');
      });

    // Account_Settings_Click Event listen
    let dialogRef: MatDialogRef<UserInfoDialogComponent>;
    this.sub1 = this.pubSubService.subscribe('accountSettingsDialogOpened', (state: boolean) => {

      if (state) {
        dialogRef = this.dialog.open(UserInfoDialogComponent, {
          width: '500px',
          data: this.userData,
        });
      } else {
        dialogRef.close();
      }

      dialogRef.afterClosed().subscribe(() => {
      });

    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
