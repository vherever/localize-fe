import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Subscription } from 'rxjs';
// app imports
import { UserInfoDialogComponent } from '../../../home/user-info-dialog/user-info-dialog.component';
import { UserModel } from '../../models/user.model';
import { AppDataGlobalStorageService } from '../../services/app-data-global-storage.service';

@Component({
  selector: 'app-pub-sub-events-handler',
  templateUrl: 'pub-sub-events-handler.component.html',
})
export class PubSubEventsHandlerComponent implements OnInit, OnDestroy {
  private userData: UserModel;
  private sub: Subscription;

  constructor(
    private pubSubService: NgxPubSubService,
    private dialog: MatDialog,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
  ) {
  }

  ngOnInit() {
    this.appDataGlobalStorageService.userData
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: UserModel) => {
        this.userData = res;
      });

    // Account_Settings_Click Event listen and open dialog
    this.onOpenAccountSettingsDialog();
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  private onOpenAccountSettingsDialog(): void {
    let dialogRef: MatDialogRef<UserInfoDialogComponent>;
    this.sub = this.pubSubService
      .subscribe('accountSettingsDialogOpened', (state: boolean) => {
        if (state) {
          dialogRef = this.dialog.open(UserInfoDialogComponent, {
            width: '500px',
            data: this.userData,
          });
        } else {
          dialogRef.close();
        }

        dialogRef.afterClosed()
          .subscribe(() => {
            this.pubSubService.publishEvent('accountSettingsDialogOpened', false);
          });
      });
  }
}
