import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AddLocaleDialogComponent } from './add-locale-dialog.component';
import { CountrySearchAutocompleteModule } from '../../../../../core/shared/country-search-autocomplete/country-search-autocomplete.module';

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
  ],
  declarations: [AddLocaleDialogComponent],
  entryComponents: [AddLocaleDialogComponent],
})
export class AddLocaleDialogModule {
}
