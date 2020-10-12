import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CacheService } from '@ngx-cache/core';
// app imports
import { TranslationsService } from '../../core/services/api-interaction/translations.service';
import { ProjectModel } from '../../core/models/project.model';
import { Store } from '@ngrx/store';
import { AppStateModel } from '../../store/models/app-state.model';
import { AddTranslationAction } from '../../store/actions/translations.action';
import { LocaleHelper } from '../../core/helpers/locale-helper';

@Component({
  templateUrl: 'translation-add-dialog.component.html',
  styleUrls: ['translation-add-dialog.scss'],
})
export class TranslationAddDialogComponent implements OnInit, OnDestroy {
  addTranslationForm: FormGroup;
  defaultLocale: string;

  constructor(
    private fb: FormBuilder,
    private cacheService: CacheService,
    private translationService: TranslationsService,
    private store: Store<AppStateModel>,
    @Inject(MAT_DIALOG_DATA) private projectData: ProjectModel,
  ) {
  }

  ngOnInit() {
    this.addTranslationForm = this.fb.group({
      assetValue: ['', Validators.required],
      assetCode: ['', Validators.required],
    });
    this.defaultLocale = LocaleHelper.getDefaultLocale(this.projectData);
  }

  ngOnDestroy() {
  }

  onTranslationSave(): void {
    const data = {
      translations: this.createTranslations(this.addTranslationForm.controls['assetValue'].value),
      assetCode: this.addTranslationForm.controls['assetCode'].value,
    };
    this.store.dispatch(new AddTranslationAction(this.projectData.uuid, data));
  }

  private createTranslations(assetValue: string): string {
    const localesObj = {};
    if (this.projectData.translationsLocales) {
      const localesArray = this.projectData.translationsLocales.split(',');
      localesArray.forEach((l: string) => {
        localesObj[l] = '';
      });
    }
    localesObj[this.defaultLocale] = assetValue;
    return JSON.stringify(localesObj);
  }
}
