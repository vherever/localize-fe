import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoRoutingModule } from './user-info-routing.module';
import { UserInfoComponent } from './user-info.component';
import { UserInfoService } from './user-info.service';
import { UserApiService } from '../../../core/api/services/user-api.service';

@NgModule({
  imports: [
    CommonModule,
    UserInfoRoutingModule,
  ],
  declarations: [UserInfoComponent],
  providers: [
    UserApiService,
    UserInfoService,
  ],
})
export class UserInfoModule {}
