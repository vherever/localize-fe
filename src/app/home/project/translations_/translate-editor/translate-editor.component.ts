import { Component, Input, OnInit } from '@angular/core';
import { TranslationModel } from '../../../../core/models/translation.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-translate-editor',
  templateUrl: 'translate-editor.component.html',
})
export class TranslateEditorComponent implements OnInit {
  @Input() translation: TranslationModel;

  translateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.translateForm = this.fb.group({
      editInLanguage: ['en'],
      translation: [''],
    });
  }

  onSaveTranslation(): void {
    console.log('___ onSaveTranslation', this.translateForm.value); // todo
  }

  onLanguageEditChange(e: any): void {
    console.log('___ e', e); // todo
  }
}
