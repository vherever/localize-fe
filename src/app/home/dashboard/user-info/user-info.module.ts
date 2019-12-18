import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app imports
import { UserInfoComponent } from './user-info.component';
import { UserApiService } from '../../../core/services/api/user-api.service';
import { ImageUploaderModule } from '../../../core/shared/image-uploader/image-uploader.module';
import { UserInfoRoutingModule } from './user-info-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ImageUploaderModule,
    UserInfoRoutingModule,
  ],
  declarations: [UserInfoComponent],
  providers: [
    UserApiService,
  ],
  exports: [UserInfoComponent],
})
export class UserInfoModule {
}
