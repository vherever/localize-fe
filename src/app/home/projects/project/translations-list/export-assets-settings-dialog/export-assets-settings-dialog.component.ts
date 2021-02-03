import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { FileSaver } from '../../../../../core/helpers/file-saver';
import { ImportExportService } from '../../../../../core/services/api-interaction/import-export.service';

const fileTypes = [
  {
    id: 1,
    text: 'JSON',
    value: 'json',
    description: 'key/value pairs',
  },
  {
    id: 2,
    text: 'PHP',
    value: 'php',
    description: 'PHP array',
  },
];

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
  public fileTypes = fileTypes;
  public exportAssetsForm: FormGroup;
  public currentSelectValue = 'json';
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
      assetType: [this.currentSelectValue],
    });
  }

  ngOnDestroy() {}

  private get localesToExportControl(): FormControl {
    return this.exportAssetsForm.get('localesToExport') as FormControl;
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
      this.assetTypeControl.value,
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
    console.log('localesToExport', localesToExport);
    this.localesToExportControl.patchValue(localesToExport);
  }

  public assetTypeChange(value: string): void {
    this.assetTypeControl.patchValue(value);
  }
}
