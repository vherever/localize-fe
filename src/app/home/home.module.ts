import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
// app imports
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserApiService } from '../core/services/api/user-api.service';
import { UserService } from '../core/services/api-interaction/user.service';
import { LanguagesApiService } from '../core/services/api/languages-api.service';
import { LanguagesService } from '../core/services/api-interaction/languages.service';
import { UserEffects } from '../store/effects/user.effects';
import { LanguagesEffects } from '../store/effects/languages.effects';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    EffectsModule.forFeature([UserEffects, LanguagesEffects]),
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    UserApiService,
    UserService,
    LanguagesApiService,
    LanguagesService,
  ],
})
export class HomeModule {
}
