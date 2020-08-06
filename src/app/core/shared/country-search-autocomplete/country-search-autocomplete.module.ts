import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
// app imports
import { CountrySearchAutocompleteComponent } from './country-search-autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [CountrySearchAutocompleteComponent],
  exports: [CountrySearchAutocompleteComponent],
  providers: [],
})
export class CountrySearchAutocompleteModule {
}
