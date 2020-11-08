/**
 * THIS COMPONENT IS NOT USING
 */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheService } from '@ngx-cache/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { catchError } from 'rxjs/operators';
// app imports
import { UserModel } from '../../core/models/user.model';
import { UserService } from '../../core/services/api-interaction/user.service';
import { ErrorModel } from '../../core/models/error.model';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  templateUrl: 'user-info-dialog.component.html',
  styleUrls: ['user-info-dialog.component.scss'],
})
export class UserInfoDialogComponent implements OnInit, OnDestroy {
  userSettingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pubSubService: NgxPubSubService,
    private cacheService: CacheService,
    private userInfoService: UserService,
    @Inject(MAT_DIALOG_DATA) public userData: UserModel,
  ) {
  }

  ngOnInit() {
    this.userSettingsForm = this.fb.group({
      name: [this.userData.name],
      email: [this.userData.email, [Validators.required]],
    });
  }

  ngOnDestroy() {
  }

  onUserSettingsSave(): void {
    this.userInfoService.updateUser(this.userData.uuid, this.userSettingsForm.value)
      .pipe(
        untilComponentDestroyed(this),
        // @ts-ignore
        catchError((error: ErrorModel) => {
          if (error.statusCode === 409) {
            this.userSettingsForm.controls['email'].setErrors({ emailExists: true });
          }
        }),
      )
      .subscribe();
  }
}
