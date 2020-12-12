import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
// app imports
import { AppStateModel } from '../../../store/models/app-state.model';
import { ClearTagStateAction, LoadTagsAction } from '../../../store/actions/tag.actions';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: 'tags-manager-dialog.component.html',
  styleUrls: ['tags-manager-dialog.component.scss'],
})
export class TagsManagerDialogComponent implements OnInit, OnDestroy {
  public tagsManagerForm: FormGroup;
  public dialogMode = 'tags-list'; // add-tag, edit-tag
  public selectedTagData: any;

  public tags$ = this.store.select((store: AppStateModel) => store.tagsData.data);
  public tagUpdated$ = this.store.select((store: AppStateModel) => store.tagsData.updated);

  public projectUuid: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<AppStateModel>,
    @Inject(MAT_DIALOG_DATA) private data: { projectUuid: string },
  ) {
    this.projectUuid = this.data.projectUuid;
  }

  ngOnInit() {
    this.tagsManagerForm = this.fb.group({
      selectedTags: [''],
    });

    this.tagUpdated$
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
        if (state) {
          this.store.dispatch(new ClearTagStateAction());
          this.dialogMode = 'tags-list';
        }
      });
  }

  ngOnDestroy() {}

  public onAddNewTagClick(): void {
    this.dialogMode = 'add-tag';
  }

  public onBackClick(): void {
    this.selectedTagData = null;
    this.dialogMode = 'tags-list';
  }

  public onSaveSelectedTags(): void {
    console.log('onSaveSelectedTags');
  }

  public editTagClickEvent(data: any): void {
    this.selectedTagData = data;
    this.dialogMode = 'edit-tag';
  }
}
