import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CacheService } from '@ngx-cache/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { UserModel } from '../../core/models/user.model';
import { AppDataGlobalStorageService } from '../../core/services/app-data-global-storage.service';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  accountSettingsForm: FormGroup;
  userData: UserModel;
  uploadsEndpoint: string;
  fileInput: ElementRef;

  constructor(
    private cacheService: CacheService,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.uploadsEndpoint = `${environment.apiUrl}/uploads`;

    this.appDataGlobalStorageService.userData
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: UserModel) => {
        this.userData = res;
      });

    this.initForm();
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

  get nameField(): FormControl {
    return this.accountSettingsForm.get('name') as FormControl;
  }

  get emailField(): FormControl {
    return this.accountSettingsForm.get('email') as FormControl;
  }

  private initForm(): void {
    this.accountSettingsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
}
