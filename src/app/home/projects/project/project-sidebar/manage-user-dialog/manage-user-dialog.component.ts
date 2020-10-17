import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Store } from '@ngrx/store';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// app imports
import { InviteUserModel } from '../../../../../core/models/invite-user.model';
import { AppStateModel } from '../../../../../store/models/app-state.model';
import { ExcludeUserFromProjectAction, ManageUserPermissionAction, ManageUserPermissionClearState } from '../../../../../store/actions/share-project.actions';
import { UPLOADS_ENDPOINT } from '../../../../../core/app-constants';
import { Observable } from 'rxjs';

interface DialogData {
  targetEmail: string;
  projectUuid: string;
  targetUuid: string;
  defaultLocale: string;
  enabledUserLocales: string;
  projectLocales: any;
  userAvatar: string;
  userName: string;
  userRole: string;
  projectTitle: string;
}

@Component({
  templateUrl: 'manage-user-dialog.component.html',
  styleUrls: ['manage-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUserDialogComponent implements OnInit, OnDestroy {
  @Output() removeUserEmit: EventEmitter<any> = new EventEmitter<any>();
  onAvailableTranslationsUpdate: EventEmitter<any> = new EventEmitter();

  public readonly uploadsEndpoint: string = UPLOADS_ENDPOINT;

  private defaultValues;
  public projectLocales: any[];

  public managePermissionsForm: FormGroup;

  public userProjectPermissionUpdated$: Observable<boolean>;
  public userIsExcludedFromProject$: Observable<boolean>;

  constructor(
    private dialogRef: MatDialogRef<ManageUserDialogComponent>,
    private fb: FormBuilder,
    private store: Store<AppStateModel>,
    private pubSubService: NgxPubSubService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  ngOnInit() {
    this.managePermissionsForm = this.fb.group({
      availableTranslationLocales: new FormArray([]),
    });
    this.projectLocales = this.data.projectLocales;
    this.initCheckboxes();

    this.userProjectPermissionUpdated$ = this.store.select((store: AppStateModel) => store.shareProject.updated);
    this.userProjectPermissionUpdated$
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
        if (state) {
          this.pubSubService.publishEvent('EVENT:LOAD_PROJECT_BY_ID', this.data.projectUuid);
        }
        this.store.dispatch(new ManageUserPermissionClearState());
      });

    this.userIsExcludedFromProject$ = this.store.select((store: AppStateModel) => store.shareProject.deleted);
    this.userIsExcludedFromProject$
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
        if (state) {
          this.dialogRef.close();
          this.pubSubService.publishEvent('EVENT:LOAD_PROJECT_BY_ID', this.data.projectUuid);
        }
      });
  }

  ngOnDestroy() {
  }

  onRemoveUserFromProjectClick(): void {
    this.store.dispatch(new ExcludeUserFromProjectAction(this.data.projectUuid, this.data.targetEmail));
  }

  onUpdatePermissionsClick(): void {
    const availableTranslationLocales = this.defaultValues.reduce((acc, curr) => {
      if (curr.checked) {
        acc.push(curr.code);
        return acc;
      }
      return acc;
    }, []).join(',');

    this.store.dispatch(new ManageUserPermissionAction(
      this.data.targetUuid,
      this.data.projectUuid,
      availableTranslationLocales,
    ));
    this.dialogRef.close();
  }

  onCheckboxChange(control: { checked: boolean, code: string }, state: boolean): void {
    control.checked = state;
  }

  private initCheckboxes(): void {
    this.projectLocales.forEach((o) => {
      const control = new FormControl(o);
      (this.managePermissionsForm.controls.availableTranslationLocales as FormArray).push(control);
    });
    this.defaultValues = this.managePermissionsForm.controls.availableTranslationLocales.value;
  }
}
