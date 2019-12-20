import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectAddDialogModule } from '../../project-add-dialog/project-add-dialog.module';
import { ProjectApiService } from '../../../core/services/api/project-api.service';
import { ProjectService } from '../../../core/services/api-interaction/project.service';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,

    ProjectAddDialogModule,
  ],
  providers: [
    ProjectApiService,
    ProjectService,
  ],
  declarations: [ProjectsComponent],
  exports: [ProjectsComponent],
})
export class ProjectsModule {
}
