import { NgModule } from '@angular/core';
import { LoadingSpinnerForButtonComponent } from './loading-spinner-for-button.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [LoadingSpinnerForButtonComponent],
  exports: [LoadingSpinnerForButtonComponent],
})
export class LoadingSpinnerForButtonModule {}
