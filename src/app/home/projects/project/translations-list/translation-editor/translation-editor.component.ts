import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// app imports
import { TranslationModel } from '../../../../../core/models/translation.model';
import { ProjectModel } from '../../../../../core/models/project.model';
import { LocalesModel } from '../../../../../core/models/locales.model';
import { LocalesHelper } from '../../../../../core/helpers/locales-helper';

interface TranslateEditorModel {
  editInLanguage: string;
  translation: string;
}

@Component({
  templateUrl: 'translation-editor.component.html',
  styleUrls: ['translation-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationEditorComponent extends LocalesHelper implements OnInit {
  @Input() translation: TranslationModel;
  @Input() projectData: ProjectModel;

  @Input() set activeLocale(val: string) {
    this.cdr.markForCheck();
    this._activeLocale = val;
    setTimeout(() => {
      if (this.translateForm) {
        this.translateForm.controls['editInLanguage'].patchValue(this.activeLocale);
        // this.onLanguageEditChange(this.activeLocale);
      }
    }, 10);
    this.localeIndex = this.projectData.translationsLocales.split(',').indexOf(this.activeLocale);
  }

  get activeLocale(): string {
    return this._activeLocale;
  }

  @Input() set activeLocaleCountryName(val: string) {
    this.cdr.markForCheck();
    this._activeLocaleCountryName = val;
  }

  get activeLocaleCountryName(): string {
    return this._activeLocaleCountryName;
  }

  @Output() newTranslationData: EventEmitter<any> = new EventEmitter();

  private _activeLocale: string;
  private _activeLocaleCountryName: string;

  localeIndex: number;
  translateForm: FormGroup;
  localesData: LocalesModel;
  locales: any[];
  textareaEnabled: boolean;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit() {
    const projectDefaultLocale = this.projectData.defaultLocale;

    this.translateForm = this.fb.group({
      editInLanguage: [projectDefaultLocale],
      translation: [this.translation.translations[projectDefaultLocale]],
    });

    this.initializeAvailableLocales();
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
    this.activeLocaleCountryName = this.getActiveLocaleCountryName(lang, this.localesData);

    this.textareaEnabled = this.locales.find((l) => l.code === lang).active;
    if (this.textareaEnabled) {
      this.translateForm.get('translation').enable();
    } else {
      this.translateForm.get('translation').disable();
    }

    // console.log('locales', this.locales);
    // console.log('translations', this.translation.translations);
  }

  private buildFullTranslation(currentLang: string, currentFormValue: TranslateEditorModel): any {
    const currentTranslation = { [currentFormValue.editInLanguage]: currentFormValue.translation };
    const translationsCloned = JSON.parse(JSON.stringify(this.translation.translations));
    delete translationsCloned[currentLang];
    return Object.assign(translationsCloned, currentTranslation);
  }

  private initializeAvailableLocales(): any {
    if (this.projectData.role === 'administrator') {
      const availableTranslations = `${this.projectData.defaultLocale},${this.projectData.translationsLocales}`;
      this.locales = this.prepareAvailableTranslations(this.translation.translations, availableTranslations);
    } else {
      const availableTranslations = this.projectData.availableTranslationLocales;
      this.locales = this.prepareAvailableTranslations(this.translation.translations, availableTranslations);
    }
  }

  private prepareAvailableTranslations(translations: any, availableTranslations: string) {
    const res: any = [];
    for (const key in translations) {
      if (translations.hasOwnProperty(key)) {
        res.push({ code: key, translation: translations[key], active: false });
      }
    }

    const availableLocations_ = availableTranslations.split(',')
      .map((v) => v.trim())
      .filter((v) => v !== '');

    res.forEach((t) => {
      availableLocations_.forEach((tt) => {
        if (t.code === tt) {
          t.active = true;
        }
      });
    });

    return res;
  }
}
