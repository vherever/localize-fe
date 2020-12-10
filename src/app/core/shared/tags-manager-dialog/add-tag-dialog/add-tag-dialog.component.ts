import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tags-manager-dialog-add-tag',
  templateUrl: 'add-tag-dialog.component.html',
})
export class AddTagDialogComponent implements OnInit {
  @ViewChild('colorsPalette', { static: false }) colorsPalette: ElementRef;
  @Input() tagDataToEdit: any;
  public addTagForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    console.log('tagDataToEdit', this.tagDataToEdit);
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
    console.log('onSaveNewTagClick', selectedColor, tagName);
  }

  public onRemoveTagClick(): void {
    console.log('onRemoveTagClick');
  }
}
