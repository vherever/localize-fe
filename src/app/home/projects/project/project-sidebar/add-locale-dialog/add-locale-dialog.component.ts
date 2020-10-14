import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { LocaleService } from '../../../../../core/services/api-interaction/locale.service';
import { ErrorModel } from '../../../../../core/models/error.model';
import { AppStateModel } from '../../../../../store/models/app-state.model';
import { AddLocaleAction, ClearLocalesStateAction } from '../../../../../store/actions/locales.actions';

@Component({
  templateUrl: 'add-locale-dialog.component.html',
  styleUrls: ['add-locale-dialog.component.scss'],
})
export class AddLocaleDialogComponent implements OnInit, OnDestroy {
  private hasError: any;

  public localeAddForm: FormGroup;
  public localeAddError$: Observable<any>;
  public localeAdded$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private localeService: LocaleService,
    private store: Store<AppStateModel>,
    private pubSubService: NgxPubSubService,
    @Inject(MAT_DIALOG_DATA) public dialogData: { projectUuid: string, projectTitle: string },
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new ClearLocalesStateAction());
    this.localeAddForm = this.fb.group({
      locale: ['', Validators.required],
    });
    this.localeAddError$ = this.store.select((store: AppStateModel) => store.localesData.error);
    this.localeAddError$
      .pipe(untilComponentDestroyed(this))
      .subscribe((error: ErrorModel) => {
        this.hasError = error;
      });

    this.localeAdded$ = this.store.select((store: AppStateModel) => store.localesData.added);
    this.localeAdded$
      .pipe(untilComponentDestroyed(this))
      .subscribe((state) => {
        if (state) {
          this.pubSubService.publishEvent('EVENT:LOAD_PROJECT_BY_ID', this.dialogData.projectUuid);
        }
      });
  }

  ngOnDestroy() {}

  private get localeField(): FormControl {
    return  this.localeAddForm.get('locale') as FormControl;
  }

  private onLanguageSelectedEmit(lang: string): void {
    this.store.dispatch(new ClearLocalesStateAction());
    if (!lang) {
      this.localeAddForm.setErrors({ required: true });
    }
    this.localeAddForm.get('locale').patchValue(lang);
  }

  public onFormSave(): void {
    this.store.dispatch(new ClearLocalesStateAction());
    this.store.dispatch(new AddLocaleAction(this.dialogData.projectUuid, this.localeAddForm.value));
  }
}
