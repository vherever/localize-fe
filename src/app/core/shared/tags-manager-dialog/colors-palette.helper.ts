import { TagInterface } from './tags-list/tag.model';

export interface ColorModel {
  hex: string;
  name: string;
  selected?: boolean;
  colorName?: string;
  color?: string;
}

export const ColorsPreset: ColorModel[] = [
  { hex: '#1abc9c', name: 'TURQUOISE', selected: false, colorName: 'green' },
  { hex: '#27ae60', name: 'NEPHRITIS', selected: false, colorName: 'green' },
  { hex: '#2980b9', name: 'BELIZE', selected: false, colorName: 'blue' },
  { hex: '#e74c3c', name: 'ALIZARIN', selected: false, colorName: 'red' },
  { hex: '#f1c40f', name: 'SUNFLOWER', selected: false, colorName: 'yellow' },
  { hex: '#34495e', name: 'WETASPHALT', selected: false, colorName: 'black' },
  { hex: '#d35400', name: 'PUMPKIN', selected: false, colorName: 'orange' },
];

export class ColorsPaletteHelper {
  public static prepareColors(tagsList: TagInterface[]): any[] {
    const tagsListCopy = tagsList.map((tag) => ({ ...tag, selected: false, colorName: '' }));
    ColorsPreset.forEach((color) => {
      tagsListCopy.forEach((tag) => {
        if (color.hex === tag.color) {
          tag.colorName = color.colorName;
        }
      });
    });
    return tagsListCopy;
  }
}
