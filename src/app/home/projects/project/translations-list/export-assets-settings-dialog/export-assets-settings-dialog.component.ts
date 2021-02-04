import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { FileSaver } from '../../../../../core/helpers/file-saver';
import { ImportExportService } from '../../../../../core/services/api-interaction/import-export.service';
import {
  FILE_FORMATS,
  ASSET_TYPES_JSON,
  ASSET_TYPES_PHP,
} from '../../../../../core/app-constants';

interface ProjectLocale {
  code: string;
  country: string;
  emoji: string;
  keyCode: string;
  lang: string;
}

@Component({
  selector: 'app-export-assets-settings-dialog',
  templateUrl: 'export-assets-settings-dialog.component.html',
  styleUrls: ['export-assets-settings-dialog.component.scss'],
})
export class ExportAssetsSettingsDialogComponent implements OnInit, OnDestroy {
  public assetFormats = FILE_FORMATS;
  public assetTypesJson = ASSET_TYPES_JSON;
  public assetTypesPhp = ASSET_TYPES_PHP;

  public currentAssetTypes = this.assetTypesJson;

  public exportAssetsForm: FormGroup;
  public currentSelectValue = 'json';
  public currentSelectAssetOptions = 'key_value_pairs';
  public projectLocales: ProjectLocale[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly dialogData: {
      projectUuid: string,
      projectLocales: ProjectLocale[]
    },
    private readonly importExportService: ImportExportService,
    private readonly fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.projectLocales = this.dialogData.projectLocales;
    this.exportAssetsForm = this.fb.group({
      localesToExport: ['', Validators.required],
      fileFormat: [this.currentSelectValue, Validators.required],
      assetType: [this.currentSelectAssetOptions, Validators.required],
    });
  }

  ngOnDestroy() {
  }

  private get localesToExportControl(): FormControl {
    return this.exportAssetsForm.get('localesToExport') as FormControl;
  }

  private get fileFormatControl(): FormControl {
    return this.exportAssetsForm.get('fileFormat') as FormControl;
  }

  private get assetTypeControl(): FormControl {
    return this.exportAssetsForm.get('assetType') as FormControl;
  }

  public onExportAssetsClick(): void {
    const languages = this.localesToExportControl.value;
    const languagesArray = languages.split(',');
    const responseType = languagesArray.length > 1 ? 'arraybuffer' : 'json';

    this.importExportService.exportAssets(
      this.dialogData.projectUuid,
      this.fileFormatControl.value,
      languages,
      responseType,
    )
      .pipe(untilComponentDestroyed(this))
      .subscribe((res) => {
        FileSaver.saveToFileSystem(res);
      });
  }

  public onListChangeEventEmit(data: any[]): void {
    const localesToExport: string = data.map((o) => o.checked && o.keyCode)
      .filter((o) => o !== false)
      .join(',');
    this.localesToExportControl.patchValue(localesToExport);
  }

  public assetTypeChange(value: string): void {
    this.fileFormatControl.patchValue(value);
    switch (value) {
      case 'json':
        this.currentSelectValue = 'json';
        this.currentAssetTypes = this.assetTypesJson;
        this.currentSelectAssetOptions = 'key_value_pairs';
        return;
      case 'php':
        this.currentSelectValue = 'php';
        this.currentAssetTypes = this.assetTypesPhp;
        this.currentSelectAssetOptions = 'zend_php_array';
        return;
      default:
        return;
    }
  }

  public assetOptionsChange(value: string): void {
    this.assetTypeControl.patchValue(value);
    this.currentSelectAssetOptions = value;
  }
}
