import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  templateUrl: 'remove-dialog-confirm.component.html',
  styleUrls: ['remove-dialog-confirm.component.scss'],
})
export class RemoveDialogConfirmComponent {
  state: boolean;

  constructor(
    public dialogRef: MatDialogRef<RemoveDialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
