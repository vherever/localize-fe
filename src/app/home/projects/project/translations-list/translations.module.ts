import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
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
import { TranslationSettingsDialogComponent } from './translation-settings-dialog/translation-settings-dialog.component';
import { TranslationTagsApiService } from '../../../../core/services/api/translation-tags-api.service';
import { TranslationTagsService } from '../../../../core/services/api-interaction/translation-tags.service';
import { TranslationTagsEffects } from '../../../../store/effects/translation-tags.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExportAssetsSettingsDialogModule } from './export-assets-settings-dialog/export-assets-settings-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslationsRoutingModule,
    TranslationEditorModule,
    FlexLayoutModule,
    SpriteModule,
    MatDialogModule,
    TranslationAddDialogModule,
    RemoveDialogConfirmModule,
    MatProgressSpinnerModule,
    ExportAssetsSettingsDialogModule,
    EffectsModule.forFeature([TranslationsEffects, TranslationTagsEffects]),
  ],
  declarations: [
    TranslationsComponent,
    TranslationsControlsBarComponent,
    TranslationSettingsDialogComponent,
  ],
  providers: [
    TranslationApiService,
    TranslationsService,
    TranslationTagsApiService,
    TranslationTagsService,
  ],
  exports: [
    TranslationsComponent,
  ],
  entryComponents: [
    TranslationSettingsDialogComponent,
  ],
})
export class TranslationsModule {
}
