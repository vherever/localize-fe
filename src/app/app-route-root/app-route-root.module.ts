import { NgModule } from '@angular/core';
import { UserService } from '../core/services/api-interaction/user.service';
import { UserApiService } from '../core/services/api/user-api.service';

@NgModule({
  providers: [
    UserApiService,
    UserService,
  ],
})
export class AppRouteRootModule {
}
