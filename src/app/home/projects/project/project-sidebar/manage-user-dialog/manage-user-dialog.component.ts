import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Store } from '@ngrx/store';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
// app imports
import { ShareProjectService } from '../../../../../core/services/api-interaction/share-project.service';
import { InviteUserModel } from '../../../../../core/models/invite-user.model';
import { AppStateModel } from '../../../../../store/models/app-state.model';
import { ManageUserPermissionAction } from '../../../../../store/actions/share-project.actions';
import { LoadProjectByIdAction } from '../../../../../store/actions/project.actions';

interface DialogData {
  targetEmail: string;
  projectUuid: string;
  targetUuid: string;
  defaultLocale: string;
  enabledUserLocales: any;
  projectLocales: any;
}

@Component({
  templateUrl: 'manage-user-dialog.component.html',
  styleUrls: ['manage-user-dialog.component.scss'],
})
export class ManageUserDialogComponent implements OnInit, OnDestroy {
  @Output() removeUserEmit: EventEmitter<any> = new EventEmitter<any>();
  onAvailableTranslationsUpdate: EventEmitter<any> = new EventEmitter();

  private defaultValues;
  public projectLocales: any[];

  public managePermissionsForm: FormGroup;

  constructor(
    private shareProjectService: ShareProjectService,
    private dialogRef: MatDialogRef<ManageUserDialogComponent>,
    private fb: FormBuilder,
    private store: Store<AppStateModel>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
  ) {
  }

  ngOnInit() {
    this.managePermissionsForm = this.fb.group({
      availableTranslationLocales: new FormArray([]),
    });
    this.projectLocales = this.data.projectLocales;
    this.initCheckboxes();
  }

  ngOnDestroy() {
  }

  onRemoveUserFromProjectClick(): void {
    const req: InviteUserModel = {
      targetEmail: this.data.targetEmail,
      projectUuid: this.data.projectUuid,
    };

    this.shareProjectService.removeUser(req)
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => {
        this.dialogRef.close();
        this.removeUserEmit.emit(req);
      });
  }

  onUpdatePermissionsClick(): void {
    const availableTranslationLocales = this.defaultValues.reduce((acc, curr) => {
      if (curr.checked) {
        acc.push(curr.value);
        return acc;
      }
      return acc;
    }, []).join(',');

    this.store.dispatch(new ManageUserPermissionAction(
      this.data.targetUuid,
      this.data.projectUuid,
      availableTranslationLocales,
    ));
    this.store.dispatch(new LoadProjectByIdAction(this.data.projectUuid, true));
    this.dialogRef.close();
  }

  onCheckboxChange(control: { checked: boolean, value: string }, state: boolean): void {
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
