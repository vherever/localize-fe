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
      defaultLocaleValue: ['', Validators.required],
      assetCode: ['', Validators.required],
    });
    this.defaultLocale = this.projectData.defaultLocale;
  }

  ngOnDestroy() {
  }

  onTranslationSave(): void {
    const data = {
      translations: this.createTranslations(this.addTranslationForm.controls['defaultLocaleValue'].value),
      assetCode: this.addTranslationForm.controls['assetCode'].value,
    };
    this.store.dispatch(new AddTranslationAction(this.projectData.uuid, data));
  }

  private createTranslations(defaultLocaleValue: string): string {
    const localesObj = {};
    if (this.projectData.translationsLocales) {
      const localesArray = this.projectData.translationsLocales.split(',');
      localesArray.forEach((l: string) => {
        localesObj[l] = '';
      });
    }
    localesObj[this.projectData.defaultLocale] = defaultLocaleValue;
    return JSON.stringify(localesObj);
  }
}
