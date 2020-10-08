import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// app imports
import { LocaleService } from '../../../../../core/services/api-interaction/locale.service';
import { ErrorModel } from '../../../../../core/models/error.model';
import { Store } from '@ngrx/store';
import { AppStateModel } from '../../../../../store/models/app-state.model';
import { AddLocaleAction } from '../../../../../store/actions/locales.actions';
import { Observable, of } from 'rxjs';

@Component({
  templateUrl: 'add-locale-dialog.component.html',
  styleUrls: ['add-locale-dialog.component.scss'],
})
export class AddLocaleDialogComponent implements OnInit, OnDestroy {
  public localeAddForm: FormGroup;
  public localeAddError$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private localeService: LocaleService,
    private store: Store<AppStateModel>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { projectUuid: string, projectTitle: string },
  ) {
  }

  ngOnInit() {
    this.localeAddForm = this.fb.group({
      locale: ['', Validators.required],
    });
    this.localeAddError$ = this.store.select((store: AppStateModel) => store.localesData.error);
  }

  ngOnDestroy() {}

  private get localeField(): FormControl {
    return  this.localeAddForm.get('locale') as FormControl;
  }

  private onLanguageSelectedEmit(lang: string): void {
    if (!lang) {
      this.clearErrorMessage();
      this.localeAddForm.setErrors({ required: true });
    }
    this.localeAddForm.get('locale').patchValue(lang);
  }

  private onFormSave(): void {
    this.store.dispatch(new AddLocaleAction(this.dialogData.projectUuid, this.localeAddForm.value));
    this.clearErrorMessage();
    // this.localeService.addLocale(this.dialogData.projectUuid, this.localeAddForm.value)
    //   .pipe(untilComponentDestroyed(this))
    //   .subscribe(() => {
    //     this.addedLocale.emit(this.localeAddForm.value.locale);
    //   }, (error: ErrorModel) => {
    //     this.errorMessage = error.message;
    //   });
  }

  private clearErrorMessage(): void {
    // this.errorMessage = '';
    // this.localeAddError$ = of(null);
  }
}
