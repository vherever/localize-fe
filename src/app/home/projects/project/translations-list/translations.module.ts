import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';
// app imports
import { TranslationsComponent } from './translations.component';
import { TranslationsRoutingModule } from './translations-routing.module';
import { TranslationApiService } from '../../../../core/services/api/translation-api.service';
import { TranslationsService } from '../../../../core/services/api-interaction/translations.service';
import { TranslationEditorModule } from './translation-editor/translation-editor.module';
import { TranslationAddDialogModule } from '../../../translation-add-dialog/translation-add-dialog.module';
import { SpriteModule } from '../../../../core/shared/sprite/sprite.module';
import { RemoveDialogConfirmModule } from '../../../../core/shared/remove-dialog-confirm/remove-dialog-confirm.module';
import { TranslationsEffects } from '../../../../store/effects/translations.effects';
import { TranslationsControlsBarComponent } from './translations-controls-bar/translations-controls-bar.component';

@NgModule({
  imports: [
    CommonModule,
    TranslationsRoutingModule,
    TranslationEditorModule,
    FlexLayoutModule,
    SpriteModule,
    MatDialogModule,
    TranslationAddDialogModule,
    RemoveDialogConfirmModule,
    EffectsModule.forFeature([TranslationsEffects]),
  ],
  declarations: [
    TranslationsComponent,
    TranslationsControlsBarComponent,
  ],
  providers: [
    TranslationApiService,
    TranslationsService,
  ],
  exports: [TranslationsComponent],
})
export class TranslationsModule {
}
