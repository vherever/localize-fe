import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// app imports
import { TranslationModel } from '../../../../../core/models/translation.model';
import { ProjectModel } from '../../../../../core/models/project.model';
import { LocalesModel } from '../../../../../core/models/locales.model';
import { LanguagesHelper } from '../../../../../core/helpers/languages-helper';
import { AppStateModel } from '../../../../../store/models/app-state.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UpdateTranslationAction } from '../../../../../store/actions/translations.action';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

interface TranslateEditorModel {
  editInLanguage: string;
  translation: string;
}

@Component({
  templateUrl: 'translation-editor.component.html',
  styleUrls: ['translation-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationEditorComponent extends LanguagesHelper implements OnInit, OnDestroy {
  @Input() translation: TranslationModel;
  @Input() projectData: ProjectModel;

  public translationUpdated$: Observable<boolean>;

  public translationUpdating$: Observable<boolean>;
  public localesData$: Observable<any[]>;
  private availableTranslations: any;

  @Input() set activeLocale(val: string) {
    this.cdr.markForCheck();
    this._activeLocale = val;
    setTimeout(() => {
      if (this.translateForm) {
        this.translateForm.controls['editInLanguage'].patchValue(this.activeLocale);
        // this.onLanguageEditChange(this.activeLocale);
      }
    }, 10);
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
  languagesData: LocalesModel;
  locales: any[];
  textareaEnabled: boolean;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private store: Store<AppStateModel>,
  ) {
    super();
  }

  ngOnInit() {
    this.translationUpdating$ = this.store.select((store: AppStateModel) => store.translationsData.updating);
    const projectDefaultLocale = this.projectData.defaultLocale;

    this.translateForm = this.fb.group({
      editInLanguage: [projectDefaultLocale],
      translation: [this.translation.translations[projectDefaultLocale]],
    });

    this.translationUpdated$ = this.store.select((store: AppStateModel) => store.translationsData.updated);
    this.localesData$ = this.store.select((store: AppStateModel) => store.localesData.data);
    this.localesData$
      .pipe(untilComponentDestroyed(this))
      .subscribe((localesData: string[]) => {
        this.initializeAvailableLocales(localesData);
      });
  }

  ngOnDestroy() {
  }

  onSaveTranslation(): void {
    const data = {
      assetCode: this.translation.assetCode,
      translations: JSON.stringify(this.buildFullTranslation(this.translateForm.value.editInLanguage, this.translateForm.value)),
    };

    // this.newTranslationData.emit(data);
    this.store.dispatch(new UpdateTranslationAction(this.projectData.uuid, this.translation.uuid, data));
  }

  onLanguageEditChange(lang: string): void {
    this.translateForm.controls['translation'].patchValue(this.translation.translations[lang]);
    this.activeLocaleCountryName = this.getActiveLocaleCountryName(lang, this.languagesData);

    this.textareaEnabled = this.locales.find((l) => l.code === lang).active;
    if (this.textareaEnabled) {
      this.translateForm.get('translation').enable();
    } else {
      this.translateForm.get('translation').disable();
    }
  }

  private buildFullTranslation(currentLang: string, currentFormValue: TranslateEditorModel): any {
    const currentTranslation = { [currentFormValue.editInLanguage]: currentFormValue.translation };
    const translationsCloned = JSON.parse(JSON.stringify(this.translation.translations));
    delete translationsCloned[currentLang];
    return Object.assign(translationsCloned, currentTranslation);
  }

  private initializeAvailableLocales(localesData: string[]): any {
    this.locales = this.prepareAvailableTranslations(this.translation.translations, localesData);
  }

  private prepareAvailableTranslations(translations: any, availableTranslations: string[]) {
    const result: any[] = [];
    availableTranslations.forEach((value: string) => {
      result.push({ code: value, translation: translations[value], active: false });
    });

    const availableLocations_ = availableTranslations
      .map((v) => v.trim())
      .filter((v) => v !== '' && v !== null);

    availableLocations_.forEach((tt) => {
      result.forEach((t) => {
        if (t.code === tt) {
          t.active = true;
        }
      });
    });

    return result;
  }
}
