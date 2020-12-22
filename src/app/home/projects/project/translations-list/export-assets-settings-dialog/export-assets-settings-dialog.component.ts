import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// app imports
import { FileSaver } from '../../../../../core/helpers/file-saver';
import { ImportExportService } from '../../../../../core/services/api-interaction/import-export.service';

@Component({
  selector: 'app-export-assets-settings-dialog',
  templateUrl: 'export-assets-settings-dialog.component.html',
  styleUrls: ['export-assets-settings-dialog.component.scss'],
})
export class ExportAssetsSettingsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly dialogData: { projectUuid: string },
    private readonly importExportService: ImportExportService,
  ) {
  }

  public onExportAssetsClick(): void {
    this.importExportService.exportAssets(this.dialogData.projectUuid)
      .subscribe((res) => {
        FileSaver.saveToFileSystem(res);
      });
  }
}
