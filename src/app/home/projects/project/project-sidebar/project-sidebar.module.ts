import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
// app imports
import { ProjectSidebarComponent } from './project-sidebar.component';
import { ManageUserDialogComponent } from './manage-user-dialog/manage-user-dialog.component';
import { InviteUserDialogComponent } from './invite-user-dialog/invite-user-dialog.component';
import { ShareProjectApiService } from '../../../../core/services/api/share-project-api.service';
import { ShareProjectService } from '../../../../core/services/api-interaction/share-project.service';
import { AddLocaleDialogModule } from './add-locale-dialog/add-locale-dialog.module';
import { EffectsModule } from '@ngrx/effects';
import { ShareProjectEffects } from '../../../../store/effects/share-project.effects';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    ReactiveFormsModule,
    AddLocaleDialogModule,
    EffectsModule.forFeature([ShareProjectEffects]),
  ],
  declarations: [
    ProjectSidebarComponent,
    ManageUserDialogComponent,
    InviteUserDialogComponent,
  ],
  providers: [
    ShareProjectApiService,
    ShareProjectService,
  ],
  exports: [ProjectSidebarComponent],
  entryComponents: [
    ManageUserDialogComponent,
    InviteUserDialogComponent,
  ],
})
export class ProjectSidebarModule {
}
