import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// app imports
import { FilterComponent } from './filter.component';
import { FilterService } from './filter.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FilterComponent,
  ],
  exports: [
    FilterComponent,
  ],
  providers: [
    FilterService,
  ],
})
export class FilterModule {
}
