import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from '../directives/click-outside.directive';

@NgModule({
  imports: [],
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
