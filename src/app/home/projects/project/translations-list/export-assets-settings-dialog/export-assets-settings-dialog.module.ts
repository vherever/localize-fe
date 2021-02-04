import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// app imports
import { ExportAssetsSettingsDialogComponent } from './export-assets-settings-dialog.component';
import { ImportExportApiService } from '../../../../../core/services/api/import-export-api.service';
import { ImportExportService } from '../../../../../core/services/api-interaction/import-export.service';
import { MatDialogModule } from '@angular/material/dialog';
import { LcSelectModule } from '../../../../../core/shared/ui/lc-select/lc-select.module';
import { AvailableLanguagesListModule } from '../../../../../core/shared/available-languages-list/available-languages-list.module';
import { AssetPreviewComponent } from './asset-preview/asset-preview.component';
import { KeysPipeModule } from '../../../../../core/pipes/keys/keys-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    LcSelectModule,
    AvailableLanguagesListModule,
    KeysPipeModule,
  ],
  declarations: [
    ExportAssetsSettingsDialogComponent,
    AssetPreviewComponent,
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
