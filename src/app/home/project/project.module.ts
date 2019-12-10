import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app imports
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { TranslationApiService } from '../../core/api/services/translation-api.service';
import { TranslationsService } from './translations_/translations.service';
import { TranslationsComponent } from './translations_/translations.component';
import { ErrorMessageModule } from '../../core/shared/error-message/error-message.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ErrorMessageModule,
  ],
  declarations: [
    ProjectComponent,
    TranslationsComponent,
  ],
  providers: [
    TranslationApiService,
    TranslationsService,
  ],
})
export class ProjectModule {
}
