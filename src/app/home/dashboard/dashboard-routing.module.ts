import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// app imports
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/home/dashboard/user-info/user-info.module#UserInfoModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
