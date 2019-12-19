import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
// app imports
import { TranslationsComponent } from './translations.component';
import { TranslationsRoutingModule } from './translations-routing.module';
import { TranslationApiService } from '../../../../../core/services/api/translation-api.service';
import { TranslationsService } from '../../../../../core/services/api-interaction/translations.service';
import { TranslationEditorModule } from './translation-editor/translation-editor.module';
import { TranslationAddDialogModule } from '../../../../translation-add-dialog/translation-add-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    TranslationsRoutingModule,
    TranslationEditorModule,
    MatDialogModule,
    TranslationAddDialogModule,
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
