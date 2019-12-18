import { RouterModule, Routes } from '@angular/router';
import { TranslationsComponent } from './translations.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: TranslationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslationsRoutingModule {
}
