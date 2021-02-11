import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
// app imports
import { ProjectSettingsDialogComponent } from './project-settings-dialog.component';
import { ProjectApiService } from '../../../core/services/api/project-api.service';
import { ProjectService } from '../../../core/services/api-interaction/project.service';
import { LcSelectModule } from '../../../core/shared/ui/lc-select/lc-select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatDialogModule,
    FlexLayoutModule,
    LcSelectModule,
  ],
  declarations: [ProjectSettingsDialogComponent],
  entryComponents: [ProjectSettingsDialogComponent],
  providers: [
    ProjectApiService,
    ProjectService,
  ],
})
export class ProjectSettingsDialogModule {
}
