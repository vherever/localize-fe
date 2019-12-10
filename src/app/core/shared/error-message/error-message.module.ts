import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// app imports
import { ErrorMessageComponent } from './error-message.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ErrorMessageComponent],
  exports: [ErrorMessageComponent],
})
export class ErrorMessageModule {
}
