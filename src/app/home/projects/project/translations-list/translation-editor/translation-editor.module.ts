import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// app imports
import { TranslationEditorComponent } from './translation-editor.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TranslationEditorComponent,
  ],
  exports: [TranslationEditorComponent],
  entryComponents: [TranslationEditorComponent],
})
export class TranslationEditorModule {
}
