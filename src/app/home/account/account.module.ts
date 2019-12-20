import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// app imports
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { ImageUploaderModule } from '../../core/shared/image-uploader/image-uploader.module';
import { MatButtonModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,

    ImageUploaderModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: [
    AccountComponent,
  ],
})
export class AccountModule {
}
