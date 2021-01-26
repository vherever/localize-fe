import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlexLayoutModule } from '@angular/flex-layout';
// app imports
import { ProjectAddDialogComponent } from './project-add-dialog.component';
import { ProjectService } from '../../core/services/api-interaction/project.service';
import { ProjectApiService } from '../../core/services/api/project-api.service';
import { CountrySearchAutocompleteModule } from '../../core/shared/country-search-autocomplete/country-search-autocomplete.module';
import { ProjectsEffects } from '../../store/effects/projects.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    NgSelectModule,
    FlexLayoutModule,
    CountrySearchAutocompleteModule,
    EffectsModule.forFeature([ProjectsEffects]),
  ],
  declarations: [ProjectAddDialogComponent],
  entryComponents: [ProjectAddDialogComponent],
  providers: [
    ProjectApiService,
    ProjectService,
  ],
})
export class ProjectAddDialogModule {
}
