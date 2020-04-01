import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CacheService } from '@ngx-cache/core';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { catchError } from 'rxjs/operators';
// app imports
import { TranslationsService } from '../../core/services/api-interaction/translations.service';
import { TranslationModel } from '../../core/models/translation.model';
import { ProjectModel } from '../../core/models/project.model';
import { ErrorModel } from '../../core/models/error.model';

@Component({
  templateUrl: 'translation-add-dialog.component.html',
  styleUrls: ['translation-add-dialog.scss'],
})
export class TranslationAddDialogComponent implements OnInit, OnDestroy {
  @Output() addedTranslation: EventEmitter<TranslationModel> = new EventEmitter();

  addTranslationForm: FormGroup;
  defaultLocale: string;

  constructor(
    private fb: FormBuilder,
    private cacheService: CacheService,
    private translationService: TranslationsService,
    @Inject(MAT_DIALOG_DATA) private projectData: ProjectModel,
  ) {
  }

  ngOnInit() {
    console.log('___ this.projectData', this.projectData); // todo
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
    this.translationService.createTranslation(this.projectData.id, data)
      .pipe(
        untilComponentDestroyed(this),
        // @ts-ignore
        catchError((error: ErrorModel) => {
          if (error.statusCode === 409) {
            this.addTranslationForm.controls['assetCode'].setErrors({ assetCodeExists: true });
          }
          return;
        }),
      )
      .subscribe((res: TranslationModel[]) => {
        this.addedTranslation.emit(res[0]);
      });
  }

  private createTranslations(defaultLocaleValue: string): string {
    const localesObj = {};
    const localesArray = this.projectData.translationsLocales.split(',');
    localesArray.forEach((l: string) => {
      localesObj[l] = '';
    });
    localesObj[this.projectData.defaultLocale] = defaultLocaleValue;
    return JSON.stringify(localesObj);
  }
}
