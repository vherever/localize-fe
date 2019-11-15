import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: 'app/home/dashboard/dashboard.module#DashboardModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
