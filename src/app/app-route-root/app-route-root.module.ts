import { NgModule } from '@angular/core';
import { UserInfoService } from '../home/dashboard/user-info/user-info.service';
import { UserApiService } from '../core/api/services/user-api.service';

@NgModule({
  providers: [
    UserApiService,
    UserInfoService,
  ],
})
export class AppRouteRootModule {
}
