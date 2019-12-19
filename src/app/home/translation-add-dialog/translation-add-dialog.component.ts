import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CacheService } from '@ngx-cache/core';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { TranslationsService } from '../../core/services/api-interaction/translations.service';
import { TranslationModel } from '../../core/models/translation.model';

@Component({
  templateUrl: 'translation-add-dialog.component.html',
  styleUrls: ['translation-add-dialog.scss'],
})
export class TranslationAddDialogComponent implements OnInit, OnDestroy {
  @Output() addedTranslation: EventEmitter<TranslationModel> = new EventEmitter();

  addTranslationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cacheService: CacheService,
    private translationService: TranslationsService,
    @Inject(MAT_DIALOG_DATA) private data: { projectId: string },
  ) {
  }

  ngOnInit() {
    this.addTranslationForm = this.fb.group({
      translations: ['', Validators.required],
      assetCode: ['', Validators.required],
    });
  }

  ngOnDestroy() {
  }

  onTranslationSave(): void {
    this.translationService.createTranslation(this.data.projectId, this.addTranslationForm.value)
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: TranslationModel[]) => {
        this.addedTranslation.emit(res[0]);
      });
  }
}
