import {RouterModule, Routes} from '@angular/router';
import {Error404Component} from './error404.component';

import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: Error404Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Error404RoutingModule {}
