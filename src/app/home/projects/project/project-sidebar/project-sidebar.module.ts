import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app imports
import { ProjectSidebarComponent } from './project-sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [ProjectSidebarComponent],
  exports: [ProjectSidebarComponent],
})
export class ProjectSidebarModule {
}
