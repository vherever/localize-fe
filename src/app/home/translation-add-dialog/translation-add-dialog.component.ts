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
    @Inject(MAT_DIALOG_DATA) private data: ProjectModel,
  ) {
  }

  ngOnInit() {
    this.addTranslationForm = this.fb.group({
      translationInDefault: ['', Validators.required],
      assetCode: ['', Validators.required],
    });
    this.defaultLocale = this.data.defaultLocale;
  }

  ngOnDestroy() {
  }

  onTranslationSave(): void {
    const data = {
      translations: JSON.stringify({ [this.defaultLocale]: this.addTranslationForm.controls['translationInDefault'].value }),
      assetCode: this.addTranslationForm.controls['assetCode'].value,
    };
    this.translationService.createTranslation(this.data.id, data)
      .pipe(
        untilComponentDestroyed(this),
        // @ts-ignore
        catchError((error: ErrorModel) => {
          if (error.statusCode === 409) {
            this.addTranslationForm.controls['assetCode'].setErrors({ assetCodeExists: true });
          }
        }),
      )
      .subscribe((res: TranslationModel[]) => {
        this.addedTranslation.emit(res[0]);
      });
  }
}