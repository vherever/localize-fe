import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// app imports
import { UserModel } from '../../core/models/user.model';
import { UserService } from '../../core/services/api-interaction/user.service';
import { UPLOADS_ENDPOINT } from '../../core/app-constants';
import { AppStateModel } from '../../store/models/app-state.model';
import { ResetUserStateAction, UpdateUserAction } from '../../store/actions/user.actions';

@Component({
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  @ViewChild('nameFieldRef') nameFieldRef: ElementRef;

  private formCurrentState: any;
  public readonly uploadsEndpoint: string = UPLOADS_ENDPOINT;
  public accountSettingsForm: FormGroup;
  public fileInput: ElementRef;
  public formChanged: boolean;
  public userData: UserModel;
  public avatar: string;

  private userData$: Observable<UserModel>;
  private userUpdated$: Observable<boolean>;
  private avatar$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private userInfoService: UserService,
    private snackBar: MatSnackBar,
    private store: Store<AppStateModel>,
  ) {
  }

  ngOnInit() {
    this.userData$ = this.store.select((store: AppStateModel) => store.userData.user);
    this.userData$
      .pipe(untilComponentDestroyed(this))
      .subscribe((userData: any) => {
        this.userData = userData;
        this.avatar = this.userData.avatar;
        this.initForm();
      });

    this.avatar$ = this.store.select((store: AppStateModel) => store.userData.avatar);
    this.avatar$
      .pipe(untilComponentDestroyed(this))
      .subscribe((avatar: string) => {
        this.avatar = avatar;
      });

    this.userUpdated$ = this.store.select((store: AppStateModel) => store.userData.updated);
    this.userUpdated$
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
        if (state) {
          this.snackBar.open(
            `The data was saved.`,
            'Okay',
            { duration: 5000 },
          );
          this.formChanged = false;
          this.nameFieldRef.nativeElement.blur();
          this.store.dispatch(new ResetUserStateAction());
        }
      });
  }

  ngOnDestroy() {
  }

  selectFileInputEmitted(el: ElementRef): void {
    this.fileInput = el;
  }

  onFormSave(): void {
    this.store.dispatch(new UpdateUserAction(this.accountSettingsForm.value, this.userData.uuid));
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
