import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Color from 'color';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// app imports
import { ColorModel, ColorsPreset } from '../colors-palette.helper';

@Component({
  selector: 'app-tags-manager-dialog-colors-palette',
  templateUrl: 'colors-palette.component.html',
  styleUrls: ['colors-palette.component.scss'],
})
export class ColorsPaletteComponent implements OnInit, OnDestroy {
  @Input() selectedTagColor: string;
  public colorsPreset: ColorModel[];
  public colorsPaletteGroup: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
  ) {
    this.colorsPreset = ColorsPreset;
  }

  ngOnInit() {
    this.colorsPaletteGroup = this.fb.group({
      color: [this.selectedTagColor_, Validators.required],
    });
    this.markColorSelected();
  }

  ngOnDestroy() {
    this.markAsUnselected();
  }

  private get selectedTagColor_(): string {
    return this.selectedTagColor ? this.selectedTagColor : this.colorsPreset[0].hex;
  }

  private markColorSelected(): void {
    const foundColor = this.colorsPreset.find((color) => color.hex === this.selectedTagColor_);
    if (foundColor) {
      foundColor.selected = true;
    }
  }

  private get colorControl(): FormControl {
    return this.colorsPaletteGroup.controls['color'] as FormControl;
  }

  public onColorSelect(color: ColorModel): void {
    this.markAsUnselected();
    const selectedColor = this.colorsPreset.find((c: ColorModel) => c.hex === color.hex);
    selectedColor.selected = !selectedColor.selected;
    this.colorControl.patchValue(color.hex);
  }

  public onHoverColorIn(color: ColorModel, tagRef: HTMLElement): void {
    tagRef.style.backgroundColor = Color(color.hex).lighten(0.25);
  }

  public onHoverColorOut(color: ColorModel, tagRef: HTMLElement): void {
    tagRef.style.backgroundColor = color.hex;
  }

  private markAsUnselected(): void {
    this.colorsPreset.forEach((color) => {
      color.selected = false;
    });
  }
}
