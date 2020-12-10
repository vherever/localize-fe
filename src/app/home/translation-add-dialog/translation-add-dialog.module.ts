import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgSelectModule } from '@ng-select/ng-select';
// app imports
import { TranslationAddDialogComponent } from './translation-add-dialog.component';
import { TranslationsService } from '../../core/services/api-interaction/translations.service';
import { TranslationApiService } from '../../core/services/api/translation-api.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    NgSelectModule,
  ],
  declarations: [TranslationAddDialogComponent],
  providers: [
    TranslationApiService,
    TranslationsService,
  ],
  entryComponents: [TranslationAddDialogComponent],
})
export class TranslationAddDialogModule {
}
