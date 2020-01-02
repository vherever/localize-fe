import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app imports
import { ProjectSidebarComponent } from './project-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ProjectSidebarComponent],
  exports: [ProjectSidebarComponent],
})
export class ProjectSidebarModule {
}
