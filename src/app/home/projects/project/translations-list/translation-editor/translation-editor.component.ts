import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { TranslationModel } from '../../../../../core/models/translation.model';
import { ProjectModel } from '../../../../../core/models/project.model';
import { LanguagesModel } from '../../../../../core/models/languages.model';
import { LanguagesHelper } from '../../../../../core/helpers/languages-helper';
import { AppStateModel } from '../../../../../store/models/app-state.model';
import { UpdateTranslationAction } from '../../../../../store/actions/translations.action';

interface TranslateEditorModel {
  editInLanguage: string;
  translation: string;
}

@Component({
  templateUrl: 'translation-editor.component.html',
  styleUrls: ['translation-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationEditorComponent implements OnInit, OnDestroy {
  @Input() translation: TranslationModel;
  @Input() projectData: ProjectModel;
  @Input() localesData: string[];

  public translationUpdated$: Observable<boolean>;

  public translationUpdating$: Observable<boolean>;
  public localesData$: Observable<any[]>;

  @Input() set activeLocale(val: string) {
    this.cdr.markForCheck();
    this._activeLocale = val;
    setTimeout(() => {
      if (this.translateForm) {
        this.translateForm.controls['editInLanguage'].patchValue(this.activeLocale);
      }
    }, 10);
  }

  get activeLocale(): string {
    return this._activeLocale;
  }

  @Input() set activeLocaleObj(val: any) {
    this.cdr.markForCheck();
    this._activeLocaleObj = val;
  }

  get activeLocaleObjResult(): any {
    return this._activeLocaleObj;
  }

  @Output() newTranslationData: EventEmitter<any> = new EventEmitter();

  private _activeLocale: string;
  private _activeLocaleObj: any;

  localeIndex: number;
  translateForm: FormGroup;
  languagesData: LanguagesModel;
  locales: any[];
  textareaEnabled$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private store: Store<AppStateModel>,
  ) {
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

    this.textareaEnabled$
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
        if (state) {
          this.translateForm.get('translation').enable();
        } else {
          this.translateForm.get('translation').disable();
        }
      });
  }

  ngOnDestroy() {
  }

  onSaveTranslation(): void {
    const data = {
      assetCode: this.translation.assetCode,
      translations: JSON.stringify(this.buildFullTranslation(this.translateForm.value.editInLanguage, this.translateForm.value)),
    };

    this.store.dispatch(new UpdateTranslationAction(this.projectData.uuid, this.translation.uuid, data));
  }

  onLanguageEditChange(lang: string): void {
    this.translateForm.controls['translation'].patchValue(this.translation.translations[lang]);
    this.activeLocaleObj = LanguagesHelper.getActiveLocaleObj(lang, this.languagesData);

    this.localesData$
      .pipe(
        untilComponentDestroyed(this),
        map((data: []) => {
          const found: any = data.find((l: any) => l.code === lang);
          this.textareaEnabled$.next(found.editable);
        }),
      )
      .subscribe();
  }

  private buildFullTranslation(currentLang: string, currentFormValue: TranslateEditorModel): any {
    const currentTranslation = { [currentFormValue.editInLanguage]: currentFormValue.translation };
    const translationsCloned = JSON.parse(JSON.stringify(this.translation.translations));
    delete translationsCloned[currentLang];
    return Object.assign(translationsCloned, currentTranslation);
  }
}
