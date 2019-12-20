import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app imports
import { UserInfoComponent } from './user-info.component';
import { UserApiService } from '../../../core/services/api/user-api.service';
import { UserInfoRoutingModule } from './user-info-routing.module';

@NgModule({
  imports: [
    CommonModule,
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
