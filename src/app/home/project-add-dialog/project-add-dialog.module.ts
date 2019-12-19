import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';
// app imports
import { ProjectAddDialogComponent } from './project-add-dialog.component';
import { ProjectService } from '../../core/services/api-interaction/project.service';
import { ProjectApiService } from '../../core/services/api/project-api.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [ProjectAddDialogComponent],
  entryComponents: [ProjectAddDialogComponent],
  providers: [
    ProjectApiService,
    ProjectService,
  ],
})
export class ProjectAddDialogModule {
}
