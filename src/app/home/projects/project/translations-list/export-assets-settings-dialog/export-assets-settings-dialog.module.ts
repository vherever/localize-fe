import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// app imports
import { ExportAssetsSettingsDialogComponent } from './export-assets-settings-dialog.component';
import { ImportExportApiService } from '../../../../../core/services/api/import-export-api.service';
import { ImportExportService } from '../../../../../core/services/api-interaction/import-export.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ExportAssetsSettingsDialogComponent,
  ],
  providers: [
    ImportExportApiService,
    ImportExportService,
  ],
  entryComponents: [
    ExportAssetsSettingsDialogComponent,
  ],
})
export class ExportAssetsSettingsDialogModule {
}
