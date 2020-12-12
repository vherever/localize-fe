import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { TagsEffects } from '../store/effects/tags.effects';
import { TagsApiService } from '../core/services/api/tags-api.service';
import { TagsService } from '../core/services/api-interaction/tags.service';

@NgModule({
  imports: [EffectsModule.forFeature([TagsEffects])],
  providers: [
    TagsApiService,
    TagsService,
  ],
})
export class AppRouteRootModule {
}
