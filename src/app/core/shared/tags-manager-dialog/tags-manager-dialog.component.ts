import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
// app imports
import { AppStateModel } from '../../../store/models/app-state.model';
import { ClearTagStateAction, LoadTagsAction } from '../../../store/actions/tag.actions';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagInterface } from './tags-list/tag.model';
import { Observable } from 'rxjs';

@Component({
  templateUrl: 'tags-manager-dialog.component.html',
  styleUrls: ['tags-manager-dialog.component.scss'],
})
export class TagsManagerDialogComponent implements OnInit, OnDestroy {
  public tagsManagerForm: FormGroup;
  public dialogMode = 'tags-list'; // add-tag, edit-tag, remove-tag
  public selectedTagData: TagInterface;

  public projectAvailableTags$ = this.store.select((store: AppStateModel) => store.tagsData.data);
  public tagUpdated$ = this.store.select((store: AppStateModel) => store.tagsData.updated);

  public projectUuid: string;
  public selectedTagsEmit: EventEmitter<TagInterface[]>  = new EventEmitter<TagInterface[]>();

  private selectedTags: TagInterface[];

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<AppStateModel>,
    @Inject(MAT_DIALOG_DATA) private data: { projectUuid: string, translationTags$?: Observable<any> },
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
    if (this.dialogMode === 'remove-tag') {
      this.dialogMode = 'edit-tag';
    } else {
      this.selectedTagData = null;
      this.dialogMode = 'tags-list';
    }
  }

  public onSaveSelectedTags(): void {
    this.selectedTagsEmit.emit(this.selectedTags);
  }

  public editTagClickEvent(selectedTagData: TagInterface): void {
    this.selectedTagData = selectedTagData;
    this.dialogMode = 'edit-tag';
  }

  public removeTagClickEmitted(): void {
    this.dialogMode = 'remove-tag';
  }

  public selectedTagsEvent(selectedTags: TagInterface[]): void {
    this.selectedTags = selectedTags;
  }
}
