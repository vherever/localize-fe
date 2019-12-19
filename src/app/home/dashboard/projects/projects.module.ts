import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectAddDialogModule } from '../../project-add-dialog/project-add-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,

    ProjectAddDialogModule,
  ],
  declarations: [ProjectsComponent],
  exports: [ProjectsComponent],
})
export class ProjectsModule {
}
