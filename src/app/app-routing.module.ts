import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AppRouteRootComponent} from './app-route-root/app-route-root.component';

const routes: Routes = [
  {
    path: '',
    component: AppRouteRootComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/home/home.module#HomeModule',
      },
      {
        path: '404',
        loadChildren: 'app/error404/error404.module#Error404Module'
      },
      {
        path: '**',
        redirectTo: '404',
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
