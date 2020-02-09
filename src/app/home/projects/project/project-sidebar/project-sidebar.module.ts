import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material';
// app imports
import { ProjectSidebarComponent } from './project-sidebar.component';
import { ManageUserDialogComponent } from './manage-user-dialog/manage-user-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
  ],
  declarations: [
    ProjectSidebarComponent,
    ManageUserDialogComponent,
  ],
  exports: [ProjectSidebarComponent],
  entryComponents: [ManageUserDialogComponent],
})
export class ProjectSidebarModule {
}
