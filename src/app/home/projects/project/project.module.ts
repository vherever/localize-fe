import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';
// app imports
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ErrorMessageModule } from '../../../core/shared/error-message/error-message.module';
import { TranslationsModule } from './translations-list/translations.module';
import { ProjectApiService } from '../../../core/services/api/project-api.service';
import { ProjectService } from '../../../core/services/api-interaction/project.service';
import { ProjectSidebarModule } from './project-sidebar/project-sidebar.module';
import { ProjectEffects } from '../../../store/effects/project.effects';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ErrorMessageModule,
    TranslationsModule,
    ProjectSidebarModule,
    FlexLayoutModule,
    EffectsModule.forFeature([ProjectEffects]),
  ],
  declarations: [
    ProjectComponent,
  ],
  providers: [
    ProjectApiService,
    ProjectService,
  ],
})
export class ProjectModule {
}
