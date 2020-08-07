import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { LocaleService } from '../../../../../core/services/api-interaction/locale.service';

@Component({
  templateUrl: 'add-locale-dialog.component.html',
  styleUrls: ['add-locale-dialog.component.scss'],
})
export class AddLocaleDialogComponent implements OnInit, OnDestroy {
  @Output() addedLocale: EventEmitter<string> = new EventEmitter();

  private localeAddForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private localeService: LocaleService,
    @Inject(MAT_DIALOG_DATA) public dialogData: { projectUuid: string, projectTitle: string },
  ) {
  }

  ngOnInit() {
    this.localeAddForm = this.fb.group({
      locale: ['', Validators.required],
    });
  }

  ngOnDestroy() {}

  private get localeField(): FormControl {
    return  this.localeAddForm.get('locale') as FormControl;
  }

  private onLanguageSelectedEmit(lang: string): void {
    if (!lang) {
      this.localeAddForm.setErrors({ required: true });
    }
    this.localeAddForm.get('locale').patchValue(lang);
  }

  private onFormSave(): void {
    this.localeService.addLocale(this.dialogData.projectUuid, this.localeAddForm.value)
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => {
        this.addedLocale.emit(this.localeAddForm.value.locale);
      });
  }
}
