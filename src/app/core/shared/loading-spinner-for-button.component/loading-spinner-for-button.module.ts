import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
// app imports
import { LoadingSpinnerForButtonComponent } from './loading-spinner-for-button.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [LoadingSpinnerForButtonComponent],
  exports: [LoadingSpinnerForButtonComponent],
})
export class LoadingSpinnerForButtonModule {}
