import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
// app imports
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectAddDialogModule } from '../project-add-dialog/project-add-dialog.module';
import { ProjectService } from '../../core/services/api-interaction/project.service';
import { ProjectApiService } from '../../core/services/api/project-api.service';
import { RemoveDialogConfirmModule } from '../../core/shared/remove-dialog-confirm/remove-dialog-confirm.module';
import { SpriteModule } from '../../core/shared/sprite/sprite.module';
import { NgxPopperModule } from 'ngx-popper';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FlexLayoutModule,
    ProjectAddDialogModule,
    RemoveDialogConfirmModule,
    SpriteModule,
    NgxPopperModule.forRoot({}),
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
