import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app imports
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserApiService } from '../core/services/api/user-api.service';
import { UserService } from '../core/services/api-interaction/user.service';
import { LocalesApiService } from '../core/services/api/locales-api.service';
import { LocalesService } from '../core/services/api-interaction/locales.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    UserApiService,
    UserService,
    LocalesApiService,
    LocalesService,
  ],
})
export class HomeModule {
}
