import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
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
  public addTranslationForm: FormGroup;
  public defaultLocale: string;

  constructor(
    private fb: FormBuilder,
    private translationService: TranslationsService,
    private store: Store<AppStateModel>,
    @Inject(MAT_DIALOG_DATA) public data: {
      projectData: ProjectModel,
      activeLocaleObj: any,
      activeLocale: string,
      defaultLocaleObj: any,
    },
  ) {
  }

  ngOnInit() {
    this.addTranslationForm = this.fb.group({
      assetValue: ['', Validators.required],
      assetCode: ['', Validators.required],
    });
    this.defaultLocale = this.data.defaultLocaleObj.keyCode;
  }

  ngOnDestroy() {
  }

  get assetValueControl(): FormControl {
    return this.addTranslationForm.controls['assetValue'] as FormControl;
  }

  onTranslationSave(): void {
    const data = {
      translations: this.createTranslations(this.addTranslationForm.controls['assetValue'].value),
      assetCode: this.addTranslationForm.controls['assetCode'].value,
    };
    this.store.dispatch(new AddTranslationAction(this.data.projectData.uuid, data));
  }

  private createTranslations(assetValue: string): string {
    const localesObj = {};
    if (this.data.projectData.translationsLocales) {
      const localesArray = this.data.projectData.translationsLocales.split(',');
      localesArray.forEach((l: string) => {
        localesObj[l] = '';
      });
    }
    localesObj[this.defaultLocale] = assetValue;
    return JSON.stringify(localesObj);
  }
}
