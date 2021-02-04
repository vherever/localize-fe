import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-asset-preview',
  templateUrl: 'asset-preview.component.html',
})
export class AssetPreviewComponent implements OnChanges {
  @Input() fileType: string;
  @Input() assetType: string;

  public jsonDataPreview: {lang: string, data: {}} = {
    lang: 'en',
    data: {
      key1: 'Value 1',
      key2: 'Value 2',
      key3: 'Value 3',
    }
  };

  ngOnChanges() {
    console.log('fileType', this.fileType);
    console.log('assetType', this.assetType);
  }
}
