import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CacheService } from '@ngx-cache/core';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// app imports
import { UserModel } from '../../core/models/user.model';
import { AppDataGlobalStorageService } from '../../core/services/app-data-global-storage.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../core/services/api-interaction/user.service';

@Component({
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  @ViewChild('nameFieldRef') nameFieldRef: ElementRef;

  private formCurrentState: any;
  accountSettingsForm: FormGroup;
  fileInput: ElementRef;
  userData: UserModel;
  uploadsEndpoint: string;
  formChanged: boolean;

  constructor(
    private cacheService: CacheService,
    private pubSubService: NgxPubSubService,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
    private fb: FormBuilder,
    private userInfoService: UserService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.uploadsEndpoint = `${environment.apiUrl}/uploads`;

    this.appDataGlobalStorageService.userData
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: UserModel) => {
        this.userData = res;
        if (this.userData) {
          this.initForm();
        }
      });
  }

  ngOnDestroy() {
  }

  onAvatarUpdated(fileName: string): void {
    this.userData.avatar = null;
    setTimeout(() => {
      this.userData.avatar = fileName;
      this.cacheService.set('userData', this.userData);
    }, 1);
  }

  selectFileInputEmitted(el: ElementRef): void {
    this.fileInput = el;
  }

  onFormSave(): void {
    this.userInfoService.updateUser(this.userData.id, this.accountSettingsForm.value)
      .pipe(untilComponentDestroyed(this))
      .subscribe((res) => {
        this.cacheService.set('userData', res);
        this.pubSubService.publishEvent('userDataCached', true);
        this.snackBar.open(
          `The data was saved.`,
          'Okay',
          { duration: 5000 },
        );
        this.formChanged = false;
        this.nameFieldRef.nativeElement.blur();
      });
  }

  onFormChange(): void {
    setTimeout(() => {
      this.formChanged = JSON.stringify(this.formCurrentState) !== JSON.stringify(this.accountSettingsForm.value);
    }, 1);
  }

  get nameField(): FormControl {
    return this.accountSettingsForm.get('name') as FormControl;
  }

  private initForm(): void {
    this.accountSettingsForm = this.fb.group({
      name: [this.userData.name, Validators.required],
      email: [{ value: this.userData.email, disabled: true }],
    });
    this.formCurrentState = this.accountSettingsForm.value;
  }
}