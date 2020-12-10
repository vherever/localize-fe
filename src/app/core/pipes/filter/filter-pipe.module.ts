import { NgModule } from '@angular/core';
// app imports
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [],
  declarations: [FilterPipe],
  exports: [FilterPipe],
  providers: [],
})
export class FilterPipeModule {
  static forRoot() {
    return {
      ngModule: FilterPipeModule,
      providers: [],
    };
  }
}
