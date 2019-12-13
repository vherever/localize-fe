import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../core/models/user.model';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

@Component({
  templateUrl: 'user-info-dialog.component.html',
  styleUrls: ['user-info-dialog.component.scss'],
})
export class UserInfoDialogComponent implements OnInit {
  userSettingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pubSubService: NgxPubSubService,
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
    this.pubSubService.publishEvent('accountSettingsDialogOpened', false);
  }
}
