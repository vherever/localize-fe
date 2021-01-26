import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
// app imports
import { AppStateModel } from '../../../../store/models/app-state.model';
import { CreateTagAction, RemoveTagAction, UpdateTagAction } from '../../../../store/actions/tag.actions';

@Component({
  selector: 'app-tags-manager-add-edit-tag',
  templateUrl: 'add-edit-tag.component.html',
})
export class AddEditTagComponent implements OnInit, OnDestroy {
  @ViewChild('colorsPalette') colorsPalette: ElementRef;
  @Output() removeTagClickEmit: EventEmitter<void> = new EventEmitter<void>();
  @Input() projectUuid: string;
  @Input() tagDataToEdit: any;
  public addTagForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<AppStateModel>,
  ) {
  }

  ngOnInit() {
    this.addTagForm = this.fb.group({
      tagName: [this.tagData.name],
    });
  }

  ngOnDestroy() {}

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
    this.removeTagClickEmit.emit();
  }
}
