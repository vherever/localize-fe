import { ModuleWithProviders, NgModule } from '@angular/core';
// app imports
import { KeysPipe } from './keys.pipe';

@NgModule({
  imports: [],
  declarations: [KeysPipe],
  exports: [KeysPipe],
  providers: [],
})
export class KeysPipeModule {
  static forRoot(): ModuleWithProviders<KeysPipeModule> {
    return {
      ngModule: KeysPipeModule,
      providers: [],
    };
  }
}
