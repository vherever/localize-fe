import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app imports
import { UserInfoRoutingModule } from './user-info-routing.module';
import { UserInfoComponent } from './user-info.component';
import { UserInfoService } from './user-info.service';
import { UserApiService } from '../../../core/api/services/user-api.service';
import { ImageUploaderModule } from '../../../core/shared/image-uploader/image-uploader.module';

@NgModule({
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    ImageUploaderModule,
  ],
  declarations: [UserInfoComponent],
  providers: [
    UserApiService,
    UserInfoService,
  ],
})
export class UserInfoModule {
}
