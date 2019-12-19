import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Subscription } from 'rxjs';
// app imports
import { UserInfoDialogComponent } from '../../../home/user-info-dialog/user-info-dialog.component';
import { UserModel } from '../../models/user.model';
import { AppDataGlobalStorageService } from '../../services/app-data-global-storage.service';
import { ProjectAddDialogComponent } from '../../../home/project-add-dialog/project-add-dialog.component';

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

    // Add_Project_Click Event listen and open dialog
    this.onOpenAddProjectDialog();
  }

  ngOnDestroy() {
    if (this.sub1) { this.sub1.unsubscribe(); }
    if (this.sub2) { this.sub2.unsubscribe(); }
  }

  private onOpenAccountSettingsDialog(): void {
    let dialogRef: MatDialogRef<UserInfoDialogComponent>;
    this.sub1 = this.pubSubService
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

  private onOpenAddProjectDialog(): void {
    let dialogRef: MatDialogRef<ProjectAddDialogComponent>;
    this.sub2 = this.pubSubService
      .subscribe('addProjectDialogOpened', (state: boolean) => {
        if (state) {
          dialogRef = this.dialog.open(ProjectAddDialogComponent, {
            width: '500px',
            data: this.userData,
          });
        } else {
          dialogRef.close();
        }

        dialogRef.afterClosed()
          .subscribe(() => {
            this.pubSubService.publishEvent('addProjectDialogOpened', false);
          });
      });
  }
}
