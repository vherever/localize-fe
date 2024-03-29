import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// app imports
import { HomeComponent } from './home.component';

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
      {
        path: 'account',
        loadChildren: 'app/home/account/account.module#AccountModule',
      },
      {
        path: 'project/:id',
        loadChildren: 'app/home/projects/project/project.module#ProjectModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
