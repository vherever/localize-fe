import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateEditorComponent } from './translate-editor.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TranslateEditorComponent,
  ],
  exports: [TranslateEditorComponent],
  entryComponents: [TranslateEditorComponent],
})
export class TranslateEditorModule {
}
