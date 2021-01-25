import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// app imports
import { AvailableLanguagesListComponent } from './available-languages-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AvailableLanguagesListComponent,
  ],
  exports: [
    AvailableLanguagesListComponent,
  ],
})
export class AvailableLanguagesListModule {
}
