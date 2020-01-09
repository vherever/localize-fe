import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsFiltersBarComponent } from './projects-filters-bar.component';
import { FilterModule } from '../../../core/shared/filter/filter.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppProjectsFilterSelectComponent } from '../filter-select/projects-filter-select.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonToggleModule } from '@angular/material';

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
  ],
  exports: [
    ProjectsFiltersBarComponent,
  ],
})
export class ProjectsFiltersBarModule {
}
