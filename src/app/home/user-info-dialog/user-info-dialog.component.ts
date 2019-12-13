import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheService } from '@ngx-cache/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { catchError } from 'rxjs/operators';
// app imports
import { UserModel } from '../../core/models/user.model';
import { UserInfoService } from '../dashboard/user-info/user-info.service';
import { ErrorModel } from '../../core/models/error.model';

@Component({
  templateUrl: 'user-info-dialog.component.html',
  styleUrls: ['user-info-dialog.component.scss'],
})
export class UserInfoDialogComponent implements OnInit {
  userSettingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pubSubService: NgxPubSubService,
    private cacheService: CacheService,
    private userInfoService: UserInfoService,
    @Inject(MAT_DIALOG_DATA) public userData: UserModel,
  ) {
  }

  ngOnInit() {
    this.userSettingsForm = this.fb.group({
      name: [this.userData.name],
      email: [this.userData.email, [Validators.required]],
    });
  }

  onUserSettingsSave(): void {
    this.userInfoService.updateUser(this.userData.id, this.userSettingsForm.value)
      .pipe(
        // @ts-ignore
        catchError((error: ErrorModel) => {
          if (error.statusCode === 409) {
            this.userSettingsForm.controls['email'].setErrors({emailExists: true});
          }
        }),
      )
      .subscribe((res) => {
        this.cacheService.set('userData', res);
        this.pubSubService.publishEvent('userDataCached', true);
        this.pubSubService.publishEvent('accountSettingsDialogOpened', false);
      });
  }
}
