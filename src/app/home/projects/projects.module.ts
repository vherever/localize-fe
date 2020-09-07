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
import { FilterModule } from '../../core/shared/filter/filter.module';
import { FilterPipe } from '../../core/pipes/filter.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppProjectsFilterSelectComponent } from './projects-filters-bar/filter-select/projects-filter-select.component';
import { FormsModule } from '@angular/forms';
import { ProjectsFiltersBarModule } from './projects-filters-bar/projects-filters-bar.module';
import { ProjectSettingsDialogModule } from './project-settings-dialog/project-settings-dialog.module';
import { ProjectsEffects } from '../../store/effects/projects.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FlexLayoutModule,
    ProjectAddDialogModule,
    ProjectSettingsDialogModule,
    RemoveDialogConfirmModule,
    SpriteModule,
    NgxPopperModule.forRoot({}),
    ProjectsFiltersBarModule,
    EffectsModule.forFeature([ProjectsEffects]),
  ],
  providers: [
    ProjectApiService,
    ProjectService,
    ProjectsEffects,
  ],
  declarations: [
    ProjectsComponent,
    FilterPipe,
  ],
  exports: [ProjectsComponent],
})
export class ProjectsModule {
}
