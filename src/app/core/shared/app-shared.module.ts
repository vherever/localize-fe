import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app imports
import { ClickOutsideDirective } from '../directives/click-outside.directive';

@NgModule({
  imports: [
    // CommonModule,
  ],
  declarations: [
    ClickOutsideDirective,
  ],
  providers: [],
  exports: [
    ClickOutsideDirective,
  ],
})
export class AppSharedModule {
}
