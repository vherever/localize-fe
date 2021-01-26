import { ModuleWithProviders, NgModule } from '@angular/core';
// app imports
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [],
  declarations: [FilterPipe],
  exports: [FilterPipe],
  providers: [],
})
export class FilterPipeModule {
  static forRoot(): ModuleWithProviders<FilterPipeModule> {
    return {
        ngModule: FilterPipeModule,
        providers: [],
    };
}
}
