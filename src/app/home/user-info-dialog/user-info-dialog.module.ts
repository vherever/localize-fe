import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoDialogComponent } from './user-info-dialog.component';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [UserInfoDialogComponent],
  entryComponents: [UserInfoDialogComponent],
})
export class UserInfoDialogModule {
}
