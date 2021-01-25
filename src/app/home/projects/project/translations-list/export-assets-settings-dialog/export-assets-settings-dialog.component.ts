import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
// app imports
import { FileSaver } from '../../../../../core/helpers/file-saver';
import { ImportExportService } from '../../../../../core/services/api-interaction/import-export.service';

interface FileType {
  id: number;
  name: string;
  value: string;
  description: string;
}

const fileTypes = [
  {
    id: 1,
    name: 'JSON',
    value: 'json',
    description: 'key/value pairs',
  },
  {
    id: 2,
    name: 'PHP',
    value: 'php',
    description: 'PHP array',
  },
];

@Component({
  selector: 'app-export-assets-settings-dialog',
  templateUrl: 'export-assets-settings-dialog.component.html',
  styleUrls: ['export-assets-settings-dialog.component.scss'],
})
export class ExportAssetsSettingsDialogComponent implements OnInit {
  public exportAssetsForm: FormGroup;
  public fileTypes: FileType[] = fileTypes;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly dialogData: { projectUuid: string },
    private readonly importExportService: ImportExportService,
    private readonly fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.exportAssetsForm = this.fb.group({
    });
  }

  public onExportAssetsClick(): void {
    const languages = 'gb-en,br-pt';
    const languagesArray = languages.split(',');
    const responseType = languagesArray.length > 1 ? 'arraybuffer' : 'json';

    this.importExportService.exportAssets(this.dialogData.projectUuid, 'json', languages, responseType)
      .subscribe((res) => {
        FileSaver.saveToFileSystem(res);
      });
  }
}
