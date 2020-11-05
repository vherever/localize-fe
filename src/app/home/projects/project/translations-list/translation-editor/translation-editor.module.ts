import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// app imports
import { TranslationEditorComponent } from './translation-editor.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  declarations: [
    TranslationEditorComponent,
  ],
  exports: [TranslationEditorComponent],
  entryComponents: [TranslationEditorComponent],
})
export class TranslationEditorModule {
}
