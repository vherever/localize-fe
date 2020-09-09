import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
// app imports
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserApiService } from '../core/services/api/user-api.service';
import { UserService } from '../core/services/api-interaction/user.service';
import { LocalesApiService } from '../core/services/api/locales-api.service';
import { LocalesService } from '../core/services/api-interaction/locales.service';
import { UserEffects } from '../store/effects/user.effects';
import { LocalesEffects } from '../store/effects/locales.effects';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    EffectsModule.forFeature([UserEffects, LocalesEffects]),
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
