import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateModel } from '../../../../store/models/app-state.model';
import { CreateTagAction, RemoveTagAction, UpdateTagAction } from '../../../../store/actions/tag.actions';

@Component({
  selector: 'app-tags-manager-dialog-add-tag',
  templateUrl: 'add-tag-dialog.component.html',
})
export class AddTagDialogComponent implements OnInit {
  @ViewChild('colorsPalette', { static: false }) colorsPalette: ElementRef;
  @Input() projectUuid: string;
  @Input() tagDataToEdit: any;
  public addTagForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly store: Store<AppStateModel>,
  ) {
  }

  ngOnInit() {
    this.addTagForm = this.fb.group({
      tagName: [this.tagData.name],
    });
  }

  public get tagData(): any {
    return this.tagDataToEdit ? this.tagDataToEdit : { tagName: '', color: '' };
  }

  public onSaveNewTagClick(): void {
    const selectedColor = this.colorsPalette['colorsPaletteGroup'].controls['color'].value;
    const tagName = this.addTagForm.controls['tagName'].value;
    this.store.dispatch(new CreateTagAction(
      this.projectUuid,
      { color: selectedColor, name: tagName },
    ));
  }

  public onUpdateTagClick(): void {
    const selectedColor = this.colorsPalette['colorsPaletteGroup'].controls['color'].value;
    const tagName = this.addTagForm.controls['tagName'].value;
    this.store.dispatch(new UpdateTagAction(
      this.projectUuid,
      this.tagDataToEdit.uuid,
      { color: selectedColor, name: tagName },
    ));
  }

  public onRemoveTagClick(): void {
    this.store.dispatch(new RemoveTagAction(this.projectUuid, this.tagDataToEdit.uuid));
  }
}
