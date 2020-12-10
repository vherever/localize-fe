import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TagInterface } from './tags-list/tag.model';

@Component({
  templateUrl: 'tags-manager-dialog.component.html',
  styleUrls: ['tags-manager-dialog.component.scss'],
})
export class TagsManagerDialogComponent implements OnInit {
  public tagsManagerForm: FormGroup;
  public dialogMode = 'tags-list'; // add-tag, edit-tag
  public selectedTagData: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { labels: TagInterface[], content: HTMLElement },
  ) {
    console.log('data123', this.data);
  }

  ngOnInit() {
    this.tagsManagerForm = this.fb.group({
      selectedTags: [''],
    });
  }

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

  public onEditTagClickEvent(data: any): void {
    this.selectedTagData = data;
    this.dialogMode = 'edit-tag';
  }
}
