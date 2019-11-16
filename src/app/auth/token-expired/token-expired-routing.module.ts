import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// app imports
import {TokenExpiredComponent} from './token-expired.component';

const routes: Routes = [
  {
    path: '',
    component: TokenExpiredComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenExpiredRoutingModule {}
