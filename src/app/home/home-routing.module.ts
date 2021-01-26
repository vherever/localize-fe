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
        loadChildren: () => import('app/home/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'account',
        loadChildren: () => import('app/home/account/account.module').then(m => m.AccountModule),
      },
      {
        path: 'project/:id',
        loadChildren: () => import('app/home/projects/project/project.module').then(m => m.ProjectModule),
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
