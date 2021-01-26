import { RemoveDialogConfirmComponent } from './remove-dialog-confirm.component';
// app imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatDialogModule,
    MatCheckboxModule,
  ],
  declarations: [RemoveDialogConfirmComponent],
  entryComponents: [RemoveDialogConfirmComponent],
  exports: [RemoveDialogConfirmComponent],
})
export class RemoveDialogConfirmModule {
}
