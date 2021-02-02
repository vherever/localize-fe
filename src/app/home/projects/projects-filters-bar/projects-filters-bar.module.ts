import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
// app imports
import { ProjectsFiltersBarComponent } from './projects-filters-bar.component';
import { FilterModule } from '../../../core/shared/filter/filter.module';
import { AppProjectsFilterSelectComponent } from './filter-select/projects-filter-select.component';
import { ProjectsListsSwitcherComponent } from './projects-lists-switcher/projects-lists-switcher.component';
import { AppSharedModule } from '../../../core/shared/app-shared.module';
import { LcSelectModule } from '../../../core/shared/ui/lc-select/lc-select.module';

@NgModule({
  imports: [
    CommonModule,
    FilterModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    AppSharedModule,
    LcSelectModule,
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
