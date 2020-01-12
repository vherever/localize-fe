import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
// app imports
import { ProjectsFiltersBarComponent } from './projects-filters-bar.component';
import { FilterModule } from '../../../core/shared/filter/filter.module';
import { AppProjectsFilterSelectComponent } from './filter-select/projects-filter-select.component';
import { ProjectsListsSwitcherComponent } from './projects-lists-switcher/projects-lists-switcher.component';

@NgModule({
  imports: [
    CommonModule,
    FilterModule,
    FormsModule,
    NgSelectModule,
    FlexLayoutModule,
    MatButtonToggleModule,
  ],
  declarations: [
    ProjectsFiltersBarComponent,
    AppProjectsFilterSelectComponent,
    ProjectsListsSwitcherComponent,
  ],
  exports: [
    ProjectsFiltersBarComponent,
  ],
})
export class ProjectsFiltersBarModule {
}
