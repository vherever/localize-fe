import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { AppStateModel } from '../../../../../store/models/app-state.model';
import { UpdateTranslationAction } from '../../../../../store/actions/translations.action';
import { TagsManagerDialogComponent } from '../../../../../core/shared/tags-manager-dialog/tags-manager-dialog.component';
import { TagInterface } from '../../../../../core/shared/tags-manager-dialog/tags-list/tag.model';
import { TranslationModel } from '../../../../../core/models/translation.model';
import { Observable, of } from 'rxjs';
import { AddTagToTranslationAction, ClearTranslationTagsStateAction, LoadTranslationTagsAction } from '../../../../../store/actions/translation-tags.actions';

@Component({
  templateUrl: 'translation-settings-dialog.component.html',
  styleUrls: ['translation-settings-dialog.component.scss'],
})
export class TranslationSettingsDialogComponent implements OnInit, OnDestroy {
  private tagsManagerDialogRef: MatDialogRef<TagsManagerDialogComponent>;

  public translationSettingsForm: FormGroup;
  public tagsList: any;
  public translationTags$: Observable<any>;
  public translationTagsLoading$: Observable<boolean>;

  ngOnInit() {
    this.translationSettingsForm = this.fb.group({
      assetCode: [this.translationData.translation.assetCode, Validators.required],
      selectedTags: [],
    });

    this.store.dispatch(new LoadTranslationTagsAction(
      this.translationData.projectUuid,
      this.translationData.translation.uuid,
    ));

    this.translationTags$ = this.store.select((store: AppStateModel) => store.translationTagsData.data);
    this.translationTagsLoading$ = this.store.select((store: AppStateModel) => store.translationTagsData.loading);
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearTranslationTagsStateAction());
  }

  get assetCodeField(): FormControl {
    return this.translationSettingsForm.controls['assetCode'] as FormControl;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public translationData: {
      translation: TranslationModel,
      projectUuid: string,
    },
    private store: Store<AppStateModel>,
    private fb: FormBuilder,
    private readonly dialog: MatDialog,
  ) {
  }

  public onTranslationSave(): void {
    const data = {
      assetCode: this.assetCodeField.value,
    };

    this.store.dispatch(new UpdateTranslationAction(
      this.translationData.projectUuid,
      this.translationData.translation.uuid,
      data,
      true),
    );
  }

  public manageTagsClick(): void {
    this.tagsManagerDialogRef = this.dialog.open(TagsManagerDialogComponent, {
      width: '400px',
      data: {
        projectUuid: this.translationData.projectUuid,
        translationTags$: this.translationTags$,
      },
    });

    this.tagsManagerDialogRef.componentInstance.selectedTagsEmit
      .pipe(untilComponentDestroyed(this))
      .subscribe((tagsList: TagInterface[]) => {
        this.tagsList = tagsList.map((tag) => tag.uuid);
        this.store.dispatch(new AddTagToTranslationAction(
          this.translationData.projectUuid,
          this.translationData.translation.uuid,
          { tagsUuids: this.tagsList.join(',') },
        ));
      });
  }
}
