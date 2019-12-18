import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsComponent } from './translations.component';
import { TranslationsRoutingModule } from './translations-routing.module';
import { TranslationApiService } from '../../../../../core/services/api/translation-api.service';
import { TranslationsService } from '../../../../../core/services/api-interaction/translations.service';
import { TranslationEditorModule } from './translation-editor/translation-editor.module';

@NgModule({
  imports: [
    CommonModule,
    TranslationsRoutingModule,
    TranslationEditorModule,
  ],
  declarations: [TranslationsComponent],
  providers: [
    TranslationApiService,
    TranslationsService,
  ],
  exports: [TranslationsComponent],
})
export class TranslationsModule {
}
