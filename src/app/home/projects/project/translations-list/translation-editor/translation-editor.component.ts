import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// app imports
import { TranslationModel } from '../../../../../core/models/translation.model';
import { ProjectModel } from '../../../../../core/models/project.model';

interface TranslateEditorModel {
  editInLanguage: string;
  translation: string;
}

@Component({
  templateUrl: 'translation-editor.component.html',
  styleUrls: ['translation-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationEditorComponent implements OnInit {
  @Input() translation: TranslationModel;
  @Input() projectData: ProjectModel;

  @Input() set activeLocale(val: string) {
    this.cdr.markForCheck();
    this._activeLocale = val;
    setTimeout(() => {
      if (this.translateForm) {
        this.translateForm.controls['editInLanguage'].patchValue(this.activeLocale);
        this.onLanguageEditChange(this.activeLocale);
      }
    }, 10);
    this.localeIndex = this.projectData.translationsLocales.split(',').indexOf(this.activeLocale);
  }

  get activeLocale() {
    return this._activeLocale;
  }

  @Output() newTranslationData: EventEmitter<any> = new EventEmitter();

  private _activeLocale: string;

  localeIndex: number;
  translateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    const projectDefaultLocale = this.projectData.defaultLocale;

    this.translateForm = this.fb.group({
      editInLanguage: [projectDefaultLocale],
      translation: [this.translation.translations[projectDefaultLocale]],
    });
  }

  onSaveTranslation(): void {
    const data = {
      assetCode: this.translation.assetCode,
      translations: JSON.stringify(this.buildFullTranslation(this.translateForm.value.editInLanguage, this.translateForm.value)),
    };

    this.newTranslationData.emit(data);
  }

  onLanguageEditChange(lang: string): void {
    this.translateForm.controls['translation'].patchValue(this.translation.translations[lang]);
  }

  private buildFullTranslation(currentLang: string, currentFormValue: TranslateEditorModel): any {
    const currentTranslation = { [currentFormValue.editInLanguage]: currentFormValue.translation };
    const translationsCloned = JSON.parse(JSON.stringify(this.translation.translations));
    delete translationsCloned[currentLang];
    return Object.assign(translationsCloned, currentTranslation);
  }
}
