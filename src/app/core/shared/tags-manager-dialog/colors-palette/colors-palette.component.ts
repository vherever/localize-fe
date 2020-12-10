import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Color from 'color';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface ColorModel {
  hex: string;
  name: string;
  selected: boolean;
}

const colorsPreset: ColorModel[] = [
  { hex: '#1abc9c', name: 'TURQUOISE', selected: false },
  { hex: '#27ae60', name: 'NEPHRITIS', selected: false },
  { hex: '#2980b9', name: 'BELIZE', selected: false },
  { hex: '#e74c3c', name: 'ALIZARIN', selected: false },
  { hex: '#f1c40f', name: 'SUNFLOWER', selected: false },
  { hex: '#34495e', name: 'WETASPHALT', selected: false },
  { hex: '#d35400', name: 'PUMPKIN', selected: false },
];

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
    this.colorsPreset = colorsPreset;
  }

  ngOnInit() {
    this.colorsPaletteGroup = this.fb.group({
      color: [this.selectedTagColor_, Validators.required],
    });
    this.markColorSelected();
    // this.colorControl.patchValue(this.selectedTagColor_);
  }

  ngOnDestroy() {
    this.markAsUnselected();
    // this.colorsPreset[0].selected = true;
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
