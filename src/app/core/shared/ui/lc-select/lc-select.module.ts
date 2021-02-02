import { NgModule } from '@angular/core';
// app imports
import { LcSelectComponent } from './lc-select.component';
import { AppSharedModule } from '../../app-shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppSharedModule,
  ],
  declarations: [LcSelectComponent],
  providers: [],
  exports: [
    LcSelectComponent,
  ],
})
export class LcSelectModule {
}
