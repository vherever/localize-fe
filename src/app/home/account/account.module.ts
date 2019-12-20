import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app imports
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { ImageUploaderModule } from '../../core/shared/image-uploader/image-uploader.module';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    ImageUploaderModule,
  ],
  declarations: [
    AccountComponent,
  ],
})
export class AccountModule {
}
