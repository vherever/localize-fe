import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app imports
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ErrorMessageModule } from '../../../../core/shared/error-message/error-message.module';
import { TranslationsModule } from './translations-list/translations.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ErrorMessageModule,
    TranslationsModule,
  ],
  declarations: [
    ProjectComponent,
  ],
})
export class ProjectModule {
}
