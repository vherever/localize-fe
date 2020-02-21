import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
// app imports
import { ShareProjectService } from '../../../../../core/services/api-interaction/share-project.service';
import { InviteUserModel } from '../../../../../core/models/invite-user.model';
import { ManagePermissionsModel } from '../../../../../core/models/manage-permissions.model';

interface DialogData {
  targetEmail: string;
  projectId: number;
  userId: number;
  projectLocales?: any;
}

@Component({
  templateUrl: 'manage-user-dialog.component.html',
  styleUrls: ['manage-user-dialog.component.scss'],
})
export class ManageUserDialogComponent implements OnInit, OnDestroy {
  @Output() removeUserEmit: EventEmitter<any> = new EventEmitter<any>();
  onAvailableTranslationsUpdate: EventEmitter<any> = new EventEmitter();

  private defaultValues;

  managePermissionsForm: FormGroup;

  constructor(
    private shareProjectService: ShareProjectService,
    private dialogRef: MatDialogRef<ManageUserDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  ngOnInit() {
    this.managePermissionsForm = this.fb.group({
      availableTranslationLocales: new FormArray([]),
    });
    this.initCheckboxes();
  }

  ngOnDestroy() {
  }

  onRemoveUserFromProjectClick(): void {
    const req: InviteUserModel = {
      targetEmail: this.data.targetEmail,
      projectId: this.data.projectId,
      userId: this.data.userId,
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

    const req: ManagePermissionsModel = {
      targetId: this.data.userId,
      projectId: this.data.projectId,
      availableTranslationLocales,
    };

    this.shareProjectService.managePermissions(req)
      .subscribe(() => {
        this.onAvailableTranslationsUpdate.emit(availableTranslationLocales);
        this.dialogRef.close();
      });

  }

  onCheckboxChange(control: { checked: boolean, value: string }, state: boolean): void {
    control.checked = state;
  }

  private initCheckboxes(): void {
    this.data.projectLocales.forEach((o) => {
      const control = new FormControl(o);
      (this.managePermissionsForm.controls.availableTranslationLocales as FormArray).push(control);
    });
    this.defaultValues = this.managePermissionsForm.controls.availableTranslationLocales.value;
  }
}
