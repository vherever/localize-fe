import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// app imports
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { ImageUploaderModule } from '../../core/shared/image-uploader/image-uploader.module';
import { UserInfoModule } from '../dashboard/user-info/user-info.module';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MatSnackBarModule,
    ImageUploaderModule,
    UserInfoModule,
  ],
  declarations: [
    AccountComponent,
  ],
})
export class AccountModule {
}
