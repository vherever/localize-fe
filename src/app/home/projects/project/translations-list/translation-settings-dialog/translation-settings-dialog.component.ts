import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
// app imports
import { AppStateModel } from '../../../../../store/models/app-state.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateTranslationAction } from '../../../../../store/actions/translations.action';

@Component({
  templateUrl: 'translation-settings-dialog.component.html',
  styleUrls: ['translation-settings-dialog.component.scss'],
})
export class TranslationSettingsDialogComponent implements OnInit, OnDestroy {
  public translationSettingsForm: FormGroup;

  ngOnInit() {
    this.translationSettingsForm = this.fb.group({
      assetCode: [this.translationData.assetCode, Validators.required],
    });
  }

  ngOnDestroy() {
  }

  get assetCodeField(): FormControl {
    return this.translationSettingsForm.controls['assetCode'] as FormControl;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public translationData: {
      projectUuid: string,
      translationUuid: string,
      assetCode: string,
    },
    private store: Store<AppStateModel>,
    private fb: FormBuilder,
  ) {
  }

  public onTranslationSave(): void {
    const data = {
      assetCode: this.assetCodeField.value,
    };

    this.store.dispatch(new UpdateTranslationAction(this.translationData.projectUuid, this.translationData.translationUuid, data, true));
  }
}
